module.exports = {
	getLang: function(srcName){
		return srcName.split('.')[1];
	},
	getComplierAPI: function(language){
		switch (language) {
			case 'c': return 'c'; break;
			case 'c14': return 'c14'; break;
			case 'c++': return 'cpp'; break;
			case 'c++14': return 'cpp14'; break;
			case 'python2': return 'py2'; break;
			case 'python3': return 'py3'; break;
			case 'pascal': return 'pas'; break;
			default: return undefined;
		}
	}
}
