var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

queue.process('submission', function(job, done) {
    console.log('Processing ' + job.data.filename + ' from ' + job.data.username);
    done(null, {
        username: job.data.username,
        problem: job.data.filename,
        score: job.data.size,
        time: 99
    });
});

queue.watchStuckJobs(10000);
