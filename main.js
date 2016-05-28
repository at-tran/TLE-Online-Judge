var jdg = require('./judger/judge.js');

jdg.Judge('elephant.cpp','cpp','1',function(result){
    console.log('Error: '+result.error);
    console.log('Accept: '+result.accept);
    console.log('Worst time: '+result.time);
});
