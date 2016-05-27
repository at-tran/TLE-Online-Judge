var fs = require('fs');
var gen = require('./compilers/general.js');

module.exports = {
	Judge: function(srcCode, language, problemCode){
		var problemDir = '../problems/' + problemCode,
			problemProperties = require(problemDir + '/properties.json'),
			lang = gen.getComplierAPI(language),
			langCpler = require('./compilers/'+lang+'.js'),
			Obj={err:undefined, ac:undefined};
		console.log(`Problem: ${problemProperties.name} - Code: ${problemProperties.code}`);
		langCpler.startJudge(srcCode, problemProperties, function(error,errorM,AC){
			Obj.err=errM;
			Obj.ac=AC;
		});
		return obj;
	}
}
