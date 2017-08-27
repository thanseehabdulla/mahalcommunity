var db = require('./db').db();
var passport = require('passport');
var bcrypt = require('bcrypt');

exports.registerUser = function (req, res) {
    req.checkBody('username', 'No valid username is given').notEmpty().len(3, 40)
    req.checkBody('password', 'No valid password is given').notEmpty().len(6, 50)

    res.setHeader('Content-Type', 'application/json')

    var errors = req.validationErrors();
    if (errors) {
        res.send(errors, 400)
    } else {
        var username = req.body['username']
        var password = req.body['password']

        db.collection('users').findOne({useremail: username}, function (err, user) {
            if (user) {
                res.send("Username is already taken", 422)
            } else {
                bcrypt.hash(password, 11, function (err, hash) {
                    db.collection('users').save({
                        usercode: 'admin',
                        username: 'admin',
                        email: 'admin@gmail.com',
                        useremail: username,
                        password: hash,
                        usertype: 0
                    }, function (err) {
                        res.send({username: username}, 200)
                    })
                })
            }
        })
    }
}