var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

queue.process('submission', function(job, done) {
    console.log(job);
    done(null, 1);
});

queue.watchStuckJobs(10000);
