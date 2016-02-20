var express = require('express');
var app = express();
var fs = require('fs');

app.set('port', process.env.PORT || 3000);

app.set('views', 'templates');
app.set('view engine', 'jade');
// app.locals.pretty = true;

app.get('/', function (request, response) {
    response.redirect('/homepage.html');
});

app.get('/:file', function(request, response) {
    var file = request.params.file;
    fs.readFile('public/' + file, function(error, data) {
        response.render('page', {content: data})
    });
});

app.use(express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});