var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});
var db;
require('./connect-to-mongo.js')(function(mdb) {
    db = mdb;
});

function queueSubmission(submission, io) {
    queue.create('submission', submission).on('complete', function(result) {
        // console.log('Processed submission ' + submission.filename + ' from ' + submission.username)
        // console.log('Result is ' + JSON.stringify(result))
        io.to(submission.username).emit('message', result);
        db.collection('results').insertOne(result);
    }).removeOnComplete(true).save();
}

module.exports = function(files, username, io) {
    files.forEach(function(file) {
        file.username = username;
        queueSubmission(file, io);
    });
};
