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
					memLim = problemProperties.memLim,
					usrChecker = problemProperties.usrChecker;
				var stdin, answer, checker=true, worstTime=0, passMemTest=true;

				console.log('Running...\n');
				// check memory limit
				cpp.checkMem(dir, memLim, fuction(pass){
					if(pass === false){
						callback('MLE','Memory limit exceeded',false,null);
						passMemTest = false;
					}
				});

				if(passMemTest === false) return;
				// run throught tests
				for(var i=ftest; i<ftest+testNum; i++){
                    // get test directory
					var dir = './problems/'+problemProperties.code+'/test'+i;

                    // get I/O and delete end-line character at the end of file
					stdin = fs.readFileSync(dir+'/input','utf-8') + '\n';
					answer = fs.readFileSync(dir+'/answer','utf-8').replace(/^\s+|\s+$/g, '');

					// console.log(`Running test #${i}... `);

                    // start running
                    cpp.run(dir, timeLim, function(err, errM, out, time){
						if(err === null){
                            // delete end-line character at the end of output
                            out = out.replace(/^\s+|\s+$/g, '');
							checker = (out === answer);
							if(checker === false) {callback('WA', 'Wrong answer', false, null);}
                            worstTime = Math.max(worstTime, time);
                            // else console.log('  OK');
                            // console.log(`  Input: ${stdin}\n  Answer: ${answer}\n  User Output: ${out}`);
							// console.log(`  Timer: ${time}ms\n  Checker: ${checker}\n`);
						}else {
                            if(err==='timeout') errM=errM+' on test '+i;
                            callback('TLE', errM, false, null); checker = false;
                        }
					});
                    // no AC, no fun :(
                    if(checker === false) break;
                    // console.log('OK!\n');
                    // if AC then...
                    if(i===ftest+testNum-1) callback(null, null, true, worstTime);
				}
			}else callback('CE', 'Compiling Error:\n'+error.message, false);
		});
	}
}
