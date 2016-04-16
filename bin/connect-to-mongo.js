var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGOLAB_URI;

module.exports = function(callback) {
    MongoClient.connect(url, function(err, mdb) {
        if (err) throw Error('Cannot connect to MongoDB');
        else callback(mdb);
    });
};
