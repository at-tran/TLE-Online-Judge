var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var sessionMiddleware = session({
    secret: require('./bin/rand-string.js')(10),
    cookie: {maxAge: 3600000},
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({url: process.env.REDIS_URL})
});

var bodyParser = require('body-parser');
var fs = require('fs');
var jade = require('jade');

var signup = require('./bin/signup.js');
var login = require('./bin/login.js');
var submission = require('./bin/submission.js');
var fetchScores = require('./bin/fetch-scores.js');

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);

app.set('views', 'views');
app.set('view engine', 'jade');

var generateHtml = jade.compileFile('views/page.jade');

app.get('/', function (request, response) {
    response.end(generateHtml({username: request.session.username}).replace(/(\r\n|\n|\r)/gm,""));
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
    submission(request.body, request.session.username, io);
    response.end();
});

app.get('/scores', function(request, response) {
    fetchScores(request, function(err, result) {
        if (err) response.redirect('/error.html');
        else response.json(result);
    })
});

app.use(express.static('public'));

io.sockets.on('connection', function(socket) {
    fetchScores(socket.request, function(err, results) {
        socket.emit('message', results);
        socket.join(socket.request.session.username);
    })
})

setTimeout(function() {
    server.listen(app.get('port'), function() {
        console.log('Listening on port ' + app.get('port'));
    });
}, 5000);
