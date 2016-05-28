var cpp = require('./cpp/cpp.js');
var fs = require('fs');

module.exports = {
	startJudge: function(srcCode, problemProperties, callback){
        console.log('Compiling...');
		cpp.compile(srcCode, function(error){
			if(error === null){
                console.log('Done!\n');
				var testNum = problemProperties.testNum,
					ftest = problemProperties.ftest,
					timeLim = problemProperties.timeLim,
					usrChecker = problemProperties.usrChecker;
				var stdin, answer, checker=true, worstTime=0;
				for(var i=ftest; i<ftest+testNum; i++){
					var dir = 'problems/'+problemProperties.code+'/test'+i;
					stdin = fs.readFileSync(dir+'/input','utf-8').replace(/^\s+|\s+$/g, '');
					answer = fs.readFileSync(dir+'/answer','utf-8').replace(/^\s+|\s+$/g, '');
					console.log(`Running test #${i}... `);
					cpp.run(dir, timeLim, function(err, errM, out, time){
                        console.log('Done!');
						if(err === null){
                            out = out.replace(/^\s+|\s+$/g, '');
							checker = (out === answer);
							if(checker === false) {callback('WA','Wrong answer',false,null);}
                            worstTime = Math.max(worstTime,time);
                            // else console.log('  OK');
                            // console.log(`  Input: ${stdin}\n  Answer: ${answer}\n  User Output: ${out}`);
							// console.log(`  Timer: ${time}ms\n  Checker: ${checker}\n`);
						}else {
                            if(err==='timeout') errM=errM+' on test '+i;
                            callback(err,errM,false,null); checker = false;
                        }
					});
                    if(checker === false) break;
                    if(i===ftest+testNum-1) callback(null,null,true,worstTime);
				}
			}else {callback('CE', 'Compiling Error:\n'+error.message, false);}

		});

	}
}
