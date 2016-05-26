var child = require('child_process');
var fs = require('fs');

module.exports = {
	compile: function(src, callback) {
		if(fs.existsSync('./a.out'))child.execSync('rm a.out');
		var srcDir = 'submissions/'+src;
		child.exec('g++ '+srcDir, function(err,out,errM){
			callback(err);
		});
	},
	run: function(dir, time, callback) {
		var date = new Date();
		var timeOut, stimer = date.getTime();
		child.exec('./a.out < '+ dir +'/input', function(err,out,errM){
			clearTimeout(timeOut);
			var date = new Date(), etimer = date.getTime(), timer = etimer-stimer;
			if(err === null) callback(err, errM, out, timer);
			else callback(err, errM, '', -1);
		});
		timeOut = setTimeout(function () {
			child.exec('kill `pgrep a.out`');
			var date = new Date(), etimer = date.getTime(), timer = etimer-stimer;
			callback('timeout', 'Time limit exceeded', null, timer);
		}, time);
	}
}
