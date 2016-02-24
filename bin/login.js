var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

module.exports = function(request, response, callback) {
    MongoClient.connect(url, function(err, db) {
        if (!err)
            db.collection('users').find({
                'username': request.body.username,
                'password': request.body.password
            }).limit(1).next(function(err, result) {
                db.close();
                if (!err)
                    if (!result) callback('Not found');
                    else {
                        var sess = request.session;
                        sess.username = result.username;
                        callback(err);
                    }
                else callback(err);
            });
        else callback(err);
    })
};