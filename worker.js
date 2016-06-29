var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});
var judge = require('./judger/judge.js');

queue.process('submission', function(job, done) {
    // console.log('Processing ' + job.data.filename + ' from ' + job.data.username);
    done(null, {
        username: job.data.username,
        ID: job.data.ID,
        score: job.data.size,
        language: job.data.language,
        time: 99
    });
});

queue.watchStuckJobs(10000);
