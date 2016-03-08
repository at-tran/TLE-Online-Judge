var kue = require('kue');
var queue = kue.createQueue({
    redis: process.env.REDIS_URL
});

var job = queue.create('submission', {
    title: "Welcome to Kue",
    content: "This is Kue",
    time: 15
}).on('complete', function(result) {
    console.log('Job completed: ' + result);
}).removeOnComplete(true).save();

console.log('hello');

