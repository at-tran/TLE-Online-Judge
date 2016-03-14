var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

function queueSubmission(submission) {
    queue.create('submission', submission).on('complete', function(result) {
        console.log('Processed submission ' + submission.filename + ' from ' + submission.username)
        console.log('Size of file is ' + result)
    }).removeOnComplete(true).save();
}

module.exports = function(files, username) {
    files.forEach(function(file) {
        file.username = username;
        queueSubmission(file);
    });
};
