/**
 * Created by Olive.C on 2015/7/15.
 */
var mongodb = require('./db.js');
var User = function (user) {
    this.name = user.name;
    this.password = user.password;
}
module.exports = User;

User.prototype.save = function (callback) {
    var user = {
        name: this.name,
        password: this.password
    }
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        } else {
            db.collection('users', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                collection.insert(user, {safe: true}, function (err, users) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, users.ops[0]);
                })
            })
        }
    })
}

User.get = function (name, password, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: name, password: password}, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                return callback(null, user);
            })
        })
    })
}

User.checkUserName = function (name, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name: name}, function (err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }

                return callback(null, user);
            })
        })
    })
}