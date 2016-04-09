var express = require('express');
var app = express();
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
// var renderPage = require('./bin/renderPage.js');
var signup = require('./bin/signup.js');
var login = require('./bin/login.js');
var randString = require('./bin/randString.js');
var RedisStore = require('connect-redis')(session);
var submission = require('./bin/submission.js');
var fetchScores = require('./bin/fetch-scores.js');
var http = require('http');
var fs = require('fs');
var jade = require('jade');
var parseParam = require('./bin/parse-param.js');
var sessionMiddleware = session({
    secret: randString(10),
    cookie: {maxAge: 3600000},
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({url: process.env.REDIS_URL})
});

var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 5000);

app.set('views', 'views');
app.set('view engine', 'jade');

// app.locals.pretty = true;

var htmlgen = jade.compileFile('views/page.jade');

app.get('/', function (request, response) {
    // response.render('page', {username: request.session.username, content: html, pretty:false});
    // console.log(htmlgen({username: request.session.username}).replace(/(\r\n|\n|\r)/gm,""));
    // console.log(request.sessionID);
    response.end(htmlgen({username: request.session.username}).replace(/(\r\n|\n|\r)/gm,""));
});

// app.get('/:file', function(request, response, next) {
//     var file = request.params.file;
//     if (path.extname(file) === '.html') response.sendFile(response, file, request.session.username);
//     else next();
// });

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


// console.log(parseParam('a','?a=b&c=d'));

io.sockets.on('connection', function(socket) {
    console.log(socket.request.session.username);
    fetchScores(socket.request, function(err, results) {
        socket.emit('message', results);
        socket.join(socket.request.session.username);
    })
    // var username = store.get(ws.upgradeReq)
    //    console.log(parseParam('connect.sid', '?' + ws.upgradeReq.headers.cookie));
})

server.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});
