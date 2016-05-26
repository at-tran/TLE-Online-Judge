var child = require('child_process');

var time = setTimeout(function(){
	console.timeEnd("Timer");
	console.log('You suck @$$');
	child.exec('kill `pgrep a.out`');
}, 15000)

console.time("Timer");
for(var i=0; i<10; i++){
	console.log(i);
	try{
		var run = child.execSync('./a.out',{
			timeout: 1000
		})
		console.timeEnd("Timer");
		console.log(`Your program returned: ${run}`);
		clearTimeout(time);
	}catch(e){
		console.timeEnd("Timer")
		console.log(e.code);
	}
}
