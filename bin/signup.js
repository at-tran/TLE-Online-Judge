var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

var db;

MongoClient.connect(url, function(err, mdb) {
    if (err) throw Error('Cannot connect to MongoDB');
    else db = mdb;
})

module.exports = function(request, response, callback) {
    db.collection('users')
    .find({'username':request.body.username})
    .limit(1).next(function(err, result) {
        if (err) callback(err);
        else if (result) callback(new Error('Username exists'));
        else db.collection('users').insertOne({
            'username': request.body.username,
            'password': request.body.password
        }, function (err, result) {
            callback(err);
        });
    });
};
