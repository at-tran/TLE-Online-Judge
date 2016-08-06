var jdg = require('./judger/judge.js');
var fs = require('fs');

var srcCode = fs.readFileSync('./submissions/elephant.cpp','utf-8');

// Judge arguments explains:
// Source code string, Language of the source, Problem ID, callback(result obj)
jdg.Judge(srcCode,'cpp','1',function(result){
    console.log('Accept: '+result.accept);
    console.log('Time:   '+result.time);
    console.log('Error:  '+result.error);
});
