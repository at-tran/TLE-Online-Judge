var db;
require('./connect-to-mongo.js')(function(mdb) {
    db = mdb;
});

module.exports = function(request, response, callback) {
    db.collection('users').find({
        'username': request.body.username,
        'password': request.body.password
    }).limit(1).next(function(err, result) {
        if (!err) {
            if (!result) callback(new Error('Not found'));
            else {
                var sess = request.session;
                sess.username = result.username;
                callback(err);
            }
        }
        else callback(err);
    });
};
