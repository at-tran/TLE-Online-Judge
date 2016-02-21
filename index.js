var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

app.set('port', process.env.PORT || 5000);

app.set('views', 'templates');
app.set('view engine', 'jade');

// app.locals.pretty = true;

app.get('/', function (request, response) {
    exec('echo hello > last_request && ls', function(error, stdout, stderr) {
        response.writeHead(200);
        response.write('stdout: ' + stdout + '\n');
        response.write('stderr: ' + stderr + '\n');
        if (error !== null) {
            response.write('exec error: ' + error);
        }
        response.end();
    });
    // response.redirect('/homepage.html');
});

function renderPage(response, file) {
    fs.readFile('pages/' + file, function(error, data) {
        if (!error) response.render('page', {content: data});
        else renderPage(response, 'error.html');
    });
}

app.get('/:file', function(request, response, next) {
    var file = request.params.file;
    if (path.extname(file) === '.html') renderPage(response, file);
    else next();
});

app.use(express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});