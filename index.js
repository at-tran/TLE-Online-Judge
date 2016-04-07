var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var renderPage = require('./bin/renderPage.js');
var signup = require('./bin/signup.js');
var login = require('./bin/login.js');
var randString = require('./bin/randString.js');
var RedisStore = require('connect-redis')(session);
var submission = require('./bin/submission.js');
var fetchScores = require('./bin/fetch-scores.js');
var http = require('http');
var WebSocketServer = require('ws').Server;
var wss;
var React = require('react');
var ReactDOMServer = require('react-dom/server');
// var App = React.createFactory(require('./public/scripts/app.js'));

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
    // var html = ReactDOMServer.renderToString(App());
    // response.render('page', {content: html, username: request.session.username});
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
    submission(request.body, request.session.username, wss);
    response.end();
});

app.get('/scores', function(request, response) {
    fetchScores(request, function(err, result) {
        if (err) response.redirect('/error.html');
        else response.json(result);
    })
});

app.use(express.static('public'));

var server = http.createServer(app);

server.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

wss = new WebSocketServer({server: server});
