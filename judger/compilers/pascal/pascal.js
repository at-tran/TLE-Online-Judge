var child = require('child_process');
var fs = require('fs');
var submitProp = require('../../../submissions/generalProperties.json');

module.exports = {
	compile: function(src, callback) {
        // if exists last compilation file then delete it
		if(fs.existsSync('./a.out')) child.execSync('rm a.out');
        // get submission number to make source code file
        submitProp.submitCount += 1;
        // update generalProperties.json
        child.execSync('echo \''+JSON.stringify(submitProp,null,4)+'\' > ./submissions/generalProperties.json');
        // get directory, name
		var srcDir = './submissions/',
            srcName = submitProp.submitCount,
            srcFullDir = srcDir+srcName+'.pas';
        // write the source code in to file
        fs.writeFileSync(srcFullDir,src);
        // compile the source
        child.exec('fpc -o./a.out '+srcFullDir, function(err,out,errM){
            if(fs.existsSync('./'+srcName+'.o')) child.execSync('rm ./'+srcName+'.o');
            callback(err);
		});
	},
	run: function(dir, time, callback) {
		var date = new Date();
		var timeOut, startTimer = date.getTime();
        try{
            var output = child.execSync('./a.out < '+ dir +'/input',{
                timeout: time
            })
            var date = new Date(), endTimer = date.getTime(), timer = endTimer-startTimer;
            callback(null, null, output.toString(), timer);
        }catch(e){
            child.exec('kill `pgrep a.out`');
            if(e.code='ETIMEDOUT') callback('timeout', 'Time limit exceeded', null, time);
            else callback(e, null, null, null);
        }
	}
}
