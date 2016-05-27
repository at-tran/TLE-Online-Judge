var api = require('./judger');
var fs = require('fs');

var _input = fs.readFileSync('test.inp', 'utf8');
var _answer = fs.readFileSync('test.out', 'utf8');

var compile = api.doCompile('test.cpp', function(_err) {
	if(_err === null){
		var run = api.doRun(_input, 1000, function(error, out, _err, timer){
			if(error === null) {
				var _checker = (_answer === out);
				console.log(`Timer: ${timer}ms\nInput: ${_input}\nAnswer: ${_answer}`);
				console.log(`Output: ${out}\nChecker: ${_checker}`);
			}else if(error === 'timeout') console.log(`Timer: ${timer}ms\n${_err}`);
			else console.log(_err);
		});
	}else console.log(_err);
});
