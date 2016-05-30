var db;
require('./connect-to-mongo.js')(function(mdb) {
    db = mdb;
});

module.exports = function(request, callback) {
    var res = db.collection('results').find({
        'username': request.session.username
    }).sort({
        '_id': -1
    }).toArray(function(err, results) {
        //        console.log(results);
        callback(err, results);
    });
}
