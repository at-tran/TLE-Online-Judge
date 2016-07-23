var child = require('child_process');
var fs = require('fs');
var submitProp = require('../../../submissions/generalProperties.json');
var srcDir = './submissions/',
    srcName = submitProp.submitCount,
    srcFullDir = srcDir+srcName+'.py';

module.exports = {
	compile: function(src, callback) {
        // get submission number to make source code file
        submitProp.submitCount += 1;
        // update generalProperties.json
        child.execSync('echo \''+JSON.stringify(submitProp,null,4)+'\' > ./submissions/generalProperties.json');
        // write the source code in to file
        fs.writeFileSync(srcFullDir,src);
        callback(null);
	},
	run: function(dir, time, callback) {
		var date = new Date();
		var timeOut, startTimer = date.getTime();
        try{
            var output = child.execSync('python2 '+srcFullDir+' < '+ dir +'/input',{
                timeout: time
            })
            var date = new Date(), endTimer = date.getTime(), timer = endTimer-startTimer;
            callback(null, null, output.toString(), timer);
        }catch(e){
            child.exec('kill `pgrep python2`');
            if(e.code=='ETIMEDOUT') callback('timeout', 'Time limit exceeded', null, time);
            else callback(e, `${e.stderr}`, null, null);
        }
	}
}
