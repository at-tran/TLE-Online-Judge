var MongoClient = require('mongodb').MongoClient;
var renderPage = require('./renderPage.js');
var url = process.env.MONGOLAB_URI;

module.exports = function(request, response, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) callback(err);
        else db.collection('users')
                .find({'username':request.body.username})
                .limit(1).next(function(err, result) {
                    if (err) callback(err);
                    else if (result) callback('Username exists');
                    else db.collection('users').insertOne({
                        'username': request.body.username,
                        'password': request.body.password
                    }, function (err, result) {
                        db.close();
                        callback(err);
                    });
                });
    })
};
