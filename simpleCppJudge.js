var execSync = require('child_process').execSync,
	exec = require('child_process').exec,
	run, compile;
var fs = require('fs'), stdin, checker;

// get input and output
stdin = fs.readFileSync('testing.inp', 'utf8');
checker = fs.readFileSync('testing.out', 'utf8');

// delete the last compile output if have
if(fs.existsSync('a.exe') === true) execSync('del a.exe');

// compile with g++
compile = exec('g++ testing.cpp',
	(error, stdout, stderr) => {
		if(error === null){
			// if no error then execute the compile output file with stdin and time limit of 1s
			run = execSync('a.exe', {input: stdin, timeout: 1000});
			// check the stdout with the answer
			console.log(checker === `${run}`);
		}else console.log(`${stderr}`);
});
