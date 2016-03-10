var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

function queueSubmission(file) {
    queue.create('submission', file).on('complete', function(result) {
        console.log('Processed file ' + file.originalname);
        console.log('Result: ' + result);
    }).removeOnComplete(true).save();
}

module.exports = function(files) {
    files.forEach(function(file) {
        queueSubmission(file);
    });
};
