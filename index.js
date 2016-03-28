var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');
var renderPage = require('./bin/renderPage.js');
var signup = require('./bin/signup.js');
var login = require('./bin/login.js');
var randString = require('./bin/randString.js');
var RedisStore = require('connect-redis')(session);
var submission = require('./bin/submission.js');

app.use(session({
    secret: randString(10),
    cookie: {maxAge: 3600000},
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({url: process.env.REDIS_URL})
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);

app.set('views', 'templates');
app.set('view engine', 'jade');

// app.locals.pretty = true;

app.get('/', function (request, response) {
    response.redirect('/home.html');
});

app.get('/:file', function(request, response, next) {
    var file = request.params.file;
    if (path.extname(file) === '.html') renderPage(response, file, request.session.username);
    else next();
});

app.post('/login', function(request, response) {
    login(request, response, function(err) {
        if (!err) response.redirect('/');
        else response.redirect('/error.html');
    })
});

app.post('/signup', function(request, response) {
    signup(request, response, function(err) {
        if (!err) response.redirect('/login.html');
        else response.redirect('/error.html');
    })
});

app.post('/upload', function(request, response) {
    console.log(request.body);
    submission(request.body, request.session.username);
    response.end();
});

app.get('/scores', function(request, response) {
    response.end()
    
});

app.use(express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
