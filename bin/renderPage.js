var fs = require('fs');
module.exports = function(response, file, username) {
    fs.readFile('pages/' + file, 'utf8', function(error, data) {
        if (!error) response.render('page', {content: data, username: username});
        else renderPage(response, 'error.html');
    });
}