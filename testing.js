var execSync = require('child_process').execSync,
	exec = require('child_process').exec,
	run, compile, kill;
var fs = require('fs'), stdin, checker;

// get input and output checker
stdin = fs.readFileSync('testing.inp', 'utf8');
checker = fs.readFileSync('testing.out', 'utf8');

// delete the last compile output if already have
if(fs.existsSync('a.exe') === true) execSync('del a.exe');

function killProcess(process) {
	kill = exec('taskkill /f /im ' + process + ' /t');
}

// compile
console.log('Compiling..');
compile = exec('g++ testing.cpp -std=c++11',
	function(cerror, stdout, stderr) {
		if(cerror === null){
			var programOutput = null;
			// run compile output with input of stdin
			console.log('Executing..'); console.time("Timer");
			run = exec('echo ' + stdin + '|a.exe',
				function(error, stdout, stderr) {
					if(error === null){
						console.timeEnd("Timer");
						console.log(stdout);
						console.log(checker === stdout);
						programOutput = stdout;
						console.log('Exited with exitcode: 0');
					}else console.log('Exited with exitcode: ' + error.code);
					killProcess('node.exe');
				}
			);
			// check if programOutput is available after 1 second, if not, time limit was exceeded
			setTimeout(function () {
				if(programOutput === null){
					console.timeEnd("Timer");
					killProcess('a.exe');
					console.log('Time limit exceeded');
				}
			}, 1000);
		}else console.log(stderr);
});
