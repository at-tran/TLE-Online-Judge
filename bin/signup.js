var MongoClient = require('mongodb').MongoClient;
var renderPage = require('./renderPage.js');
var url = process.env.MONGOLAB_URI;

module.exports = function(request, response, callback) {
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            // TODO: Check if username already exists
            db.collection('users').insertOne({
                'username': request.body.username,
                'password': request.body.password
            }, function (err, result) {
                db.close();
                callback(err);
            });
        }
        else callback(err);
    })
};