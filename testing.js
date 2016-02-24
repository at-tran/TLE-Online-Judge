var execSync = require('child_process').execSync,
	exec = require('child_process').exec,
	run, compile, kill;
var fs = require('fs'), stdin, checker;
// var sc = require('sandcastle').SandCastle;

// get input and output
stdin = fs.readFileSync('testing.inp', 'utf8');
checker = fs.readFileSync('testing.out', 'utf8');

// delete the last compile output if already have
if(fs.existsSync('a.exe') === true) execSync('del a.exe');

// kill process if exceeds time limit
function killProcess() {
	kill = exec('taskkill /f /im a.exe /t', function(){ console.log('Time Limit Exceeded'); });
}

// compile
compile = exec('g++ testing.cpp -std=c++11',
	function(cerror, stdout, stderr) {
		if(cerror === null){
			var programOutput = null;
			// run compile output with input of stdin
			run = exec('echo ' + stdin + '|a.exe',
				function(error, stdout, stderr) {
					if(error === null){
						console.log(stdout);
						console.log(checker === stdout);
						programOutput = stdout;
					}else console.log('Exited with exitcode: ' + error.code);
				}
			);
			// check if programOutput is available after 1 second, if not, time limit was exceeded
			setTimeout(function () {if(programOutput === null) killProcess();}, 1000);
		}else console.log(stderr);
});
