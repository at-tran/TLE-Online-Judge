var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

var db;

MongoClient.connect(url, function(err, mdb) {
    if (err) throw Error('Cannot connect to MongoDB');
    else db = mdb;
})

function queueSubmission(submission, wss) {
    queue.create('submission', submission).on('complete', function(result) {
        console.log('Processed submission ' + submission.filename + ' from ' + submission.username)
        console.log('Result is ' + JSON.stringify(result))
        wss.clients.forEach(function(client) {
            client.send(JSON.stringify(result));
        })
        db.collection('results').insertOne(result);
    }).removeOnComplete(true).save();
}

module.exports = function(files, username, wss) {
    files.forEach(function(file) {
        file.username = username;
        queueSubmission(file, wss);
    });
};
