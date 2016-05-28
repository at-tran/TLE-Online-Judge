var fs = require('fs');

module.exports = {
	Judge: function(srcCode, language, problemCode, callback){
		var problemDir = '../problems/' + problemCode,
			problemProperties = require(problemDir + '/properties.json'),
			langCpler = require('./compilers/'+language+'.js'),
			obj={};
		console.log(`Problem: ${problemProperties.name} - Code: ${problemProperties.code}\n`);
		langCpler.startJudge(srcCode, problemProperties, function(error,errorM,ac,maxTime){
			obj.error=errorM;
			obj.accept=ac;
            obj.time=maxTime;
            callback(obj);
		});
	}
}
