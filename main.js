var jdg = require('./judger/judge.js');
var fs = require('fs');

var srcCode = fs.readFileSync('./submissions/elephant.cpp','utf-8');

jdg.Judge(srcCode,'cpp','1',function(result){
    console.log('Accept: '+result.accept);
    console.log('Worst time: '+result.time);
    console.log('Error: '+result.error);
});
