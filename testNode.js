var child = require('child_process');

console.time("Timer");
try{
	var run = child.execSync('./a.out',{
		timeout: 1000
	});
	console.timeEnd("Timer");
	console.log('Pass memory test');
}catch(e){
	console.log('Thrown');
}
