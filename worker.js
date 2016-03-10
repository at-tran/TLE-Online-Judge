var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

queue.process('submission', function(job, done) {
    console.log('Processing ' + job.data.originalname + ' from ' + job.data.username);
    done(null, job.data.size);
});

queue.watchStuckJobs(10000);
