var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

var db;

MongoClient.connect(url, function(err, mdb) {
    if (err) throw Error('Cannot connect to MongoDB');
    else db = mdb;
})

module.exports = function(request, callback) {
    var res = db.collection('results').find({
        //        'username': request.session.username
    }).toArray(function(err, results) {
        console.log(results);
        callback(err, results);
    });
}
