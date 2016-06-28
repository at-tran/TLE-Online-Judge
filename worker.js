var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});
// var judge = require('judger/judge.js');

queue.process('submission', function(job, done) {
    // console.log('Processing ' + job.data.filename + ' from ' + job.data.username);
    console.log(job.data.filetype)
    done(null, {
        username: job.data.username,
        problem: job.data.filename,
        score: job.data.size,
        filetype: job.data.filetype,
        time: 99
    });
});

queue.watchStuckJobs(10000);
