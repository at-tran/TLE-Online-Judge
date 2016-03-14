var execSync = require('child_process').execSync,
	exec = require('child_process').exec,
	run, compile, kill;
var fs = require('fs'), stdin, checker;
var nodePID = process.pid;

// get input and output checker
stdin = fs.readFileSync('test.inp', 'utf8');
checker = fs.readFileSync('test.out', 'utf8');

// delete the last compile output if already have
if(fs.existsSync('a.out') === true) execSync('rm a.out');

function killProcess(process) {
	kill = exec('kill -9 ' + process);
}

// compile
console.log('Compiling..');
compile = exec('g++ -std=c++11 test.cpp',
	function(cerror, stdout, stderr) {
		if(cerror === null){
			var programOutput = null, timeOut;
			// run compile output with input of stdin
			console.log('Executing..'); console.time("Timer");
			run = exec('echo ' + stdin + '|./a.out',
				function(error, stdout, stderr) {
					if(error === null){
						console.timeEnd("Timer");
						console.log(stdout);
						console.log(checker === stdout);
						programOutput = stdout;
						console.log('Exited with exitcode: 0');
					}else console.log('Exited with exitcode: ' + error.code);
					clearTimeout(timeOut);
				}
			);
			// check if programOutput is available after 1 second, if not, time limit was exceeded
			timeOut = setTimeout(function () {
				if(programOutput === null){
					console.timeEnd("Timer");
					killProcess('$(pgrep a.out)');
					console.log('Time limit exceeded');
				}
			}, 1000);
		}else console.log(stderr);
});
