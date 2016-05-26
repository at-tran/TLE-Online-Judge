var cpp = require('./cpp/cpp.js');
var fs = require('fs');

module.exports = {
	startJudge: function(srcCode, problemProperties, callback){
		cpp.compile(srcCode, function(error){
			if(error === null){
				var testNum = problemProperties.testNum,
					ftest = problemProperties.ftest,
					timeLim = problemProperties.timeLim,
					usrChecker = problemProperties.usrChecker;
				var stdin, answer, checker;

				for(var i=ftest; i<ftest+testNum; i++){
					var dir = 'problems/'+problemProperties.code+'/test'+i;
					stdin = fs.readFileSync(dir+'/input','utf-8');
					answer = fs.readFileSync(dir+'/answer','utf-8');
					console.log(i);
					cpp.run(dir, timeLim, function(err, errM, out, time){
						if(err === null){
							checker = (out === answer);
							if(checker === false) {callback('WA',s);}
							else console.log(i);
							// console.log(`Input: ${stdin}\nAnswer: ${out}`);
							// console.log(`Timer: ${time}ms\nChecker: ${checker}`);
						}else {callback(err, errM);}
					});
				}

			}else {callback('CE', 'Compiling Error: '+error.message);}
		});

	}
}
