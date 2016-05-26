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
        try{
            var output = child.execSync('./a.out < '+ dir +'/input',{
                timeout: time
            })
            var date = new Date(), etimer = date.getTime(), timer = etimer-stimer;
            callback(null,null,output.toString(),timer);
        }catch(e){
            child.exec('kill `pgrep a.out`');
            if(e.code='ETIMEDOUT') callback('timeout', '  Time limit exceeded', null, time);
            else callback(e,null,null,null);
        }
	}
}
