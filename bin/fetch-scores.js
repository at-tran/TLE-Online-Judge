var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

module.exports = function(body) {
    MongoClient.connect(url, function(err, db) {
        if (err) callback(err);
        else return db.collection('scores').find({
            'username': body.username
        }).toArray();
    })
};
