var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

app.get('/', function (request, response) {
    response.end('<h1>Hello from port ' + app.get('port') + '!</h1>');
});

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});