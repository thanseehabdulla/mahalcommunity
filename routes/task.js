var express = require('express');

var router = express.Router();

var ObjectID = require('mongodb').ObjectID;

var db = require('./../db').db();

var bcrypt = require('bcrypt');

var crypto = require('crypto');


// addmahal
router.post('/addmahal', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    var task = req.body;
    var mahalname = req.body['mahalname'];
    var password = req.body['password'];
    var email = req.body['email'];
    var mahalcode = req.body['mahalcode'];
    var address = req.body['address'];
    var phone = req.body['phone'];
    var pincode = req.body['pincode'];
    var alternatenumber = req.body['alternatenumber'];
    var mahalstatus = req.body['mahalstatus'];


    if ((!task.mahalcode) || (!task.mahalname) || (!task.pincode) || (!task.phone) || (!task.password) || (!task.alternatenumber) || (!task.address)) {
        res.status(400)
        res.json({"error": "bad data"})
    } else {
        bcrypt.hash(password, 11, function (err, hash) {
            db.collection('users').findOne({mahalcode: mahalcode}, function (err, user) {
                if (user) {
                    res.send("Username is already taken", 422)
                } else {
                    db.collection('users').save({
                        mahalstatus: mahalstatus,
                        mahalname: mahalname,
                        password: hash,
                        mahalcode: mahalcode,
                        email: email,
                        address: address,
                        phone: phone,
                        pincode: pincode,
                        usertype: 2,
                        alternatenumber: alternatenumber
                    }, function (err, results) {
                        if (err) throw err
                        res.json(results);
                    })
                }
            })
        })
    }
});

// addmember
router.post('/addmember', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    var task = req.body;
    var name = req.body['name'];
    var password = req.body['password'];
    var email = req.body['email'];
    var regno = req.body['regno'];
    var address = req.body['address'];
    var mobile = req.body['mobile'];
    var landlinenumber = req.body['landlinenumber'];
    var fathername = req.body['fathername'];
    var housename = req.body['housename'];
    var houseno = req.body['houseno'];
    var created_at = req.body['created_at'];
    var updated_at = req.body['updated_at'];
    var lastmosquename = req.body['lastmosquename'];
    var currentmosquename = req.body['currentmosquename'];
    var varasangya = req.body['varasangya'];
    var accesstoken = req.headers.authorization.split(" ")[1];

    if ((!task.regno) || (!task.name) || (!task.varasangya) || (!task.mobile) || (!task.password) || (!task.landlinenumber) || (!task.address)) {
        res.status(400)
        res.json({"error": "bad data"})
    } else {
        var accessTokenHash = crypto.createHash('sha1').update(accesstoken).digest('hex')
        db.collection('accessTokens').findOne({token: accessTokenHash}, function (err, token) {
            if (err) throw err
            bcrypt.hash(password, 11, function (err, hash) {
                db.collection('users').findOne({$and: [{regno: regno}, {linkcode: token.userId}]}, function (err, user) {
                    if (user) {
                        res.send("Username is already taken", 422)
                    } else {
                        db.collection('users').save({
                            linkcode: token.userId,
                            name: name,
                            password: hash,
                            regno: regno,
                            email: email,
                            address: address,
                            mobile: mobile,
                            block:true,
                            unblock:false,
                            varasangya: varasangya,
                            usertype: 1,
                            landlinenumber: landlinenumber,
                            housename: housename,
                            houseno: houseno,
                            fathername: fathername,
                            created_at: created_at,
                            updated_at: updated_at,
                            lastmosquename: lastmosquename,
                            currentmosquename: currentmosquename
                        }, function (err, results) {
                            if (err) throw err
                            res.json(results);
                        })
                    }
                })
            })
        })
    }
})

// get member data
router.get('/getmembers', function (req, res, next) {
    // find everything
    var accesstoken = req.headers.authorization.split(" ")[1];
    var accessTokenHash = crypto.createHash('sha1').update(accesstoken).digest('hex')
    db.collection('accessTokens').findOne({token: accessTokenHash}, function (err, token) {
        if (err) throw err
        db.collection('users').find({$and: [{usertype: 1}, {linkcode: token.userId}]}).toArray(function (err, result) {
            if (err) throw err
            res.json(result);
        })
    })
});


// single members data
router.get('/getmembers/:id', function (req, res, next) {
    // find everything
    db.collection('users').findOne({_id: ObjectID(req.params.id)}, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});

// single members data
router.get('/getmembersreg/:id', function (req, res, next) {
    // find everything
    db.collection('users').findOne({regno: req.params.id}, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});
// update members

router.put('/updatemembers/:id', function (req, res, next) {
    var task = req.body;
    var name = req.body['name'];
    var password = req.body['password'];
    var email = req.body['email'];
    var regno = req.body['regno'];
    var address = req.body['address'];
    var mobile = req.body['mobile'];
    var landlinenumber = req.body['landlinenumber'];
    var fathername = req.body['fathername'];
    var housename = req.body['housename'];
    var houseno = req.body['houseno'];
    var varasangya = req.body['varasangya'];
// var created_at = req.body['created_at'];
    var updated_at = req.body['updated_at'];
    var lastmosquename = req.body['lastmosquename'];
    var currentmosquename = req.body['currentmosquename'];

    if ((!task.regno) || (!task.name) || (!task.houseno) || (!task.mobile) || (!task.password) || (!task.landlinenumber) || (!task.address)) {
        res.status(400)
        res.json({"error": "Bad data"})
    } else {
        bcrypt.hash(password, 11, function (err, hash) {
            db.collection('users').update({_id: ObjectID(req.params.id)}, {
                $set: {
                    name: name,
                    password: hash,
                    regno: regno,
                    email: email,
                    address: address,
                    mobile: mobile,
                    varasangya: varasangya,
                    usertype: 1,
                    landlinenumber: landlinenumber,
                    housename: housename,
                    houseno: houseno,
                    fathername: fathername,
                    updated_at: updated_at,
                    lastmosquename: lastmosquename,
                    currentmosquename: currentmosquename
                }
            }, function (err, results) {
                if (err) throw err
                res.json(results);
            })
        })
    }
});

// delete members
router.delete('/removemembers/:id', function (req, res, next) {
    // find everything
    db.collection('users').remove({_id: ObjectID(req.params.id)}, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});


// update members

router.put('/updatemembersstatus/:id', function (req, res, next) {
    var memberstatus = req.body['memberstatus'];
    var updated_at = req.body['updated_at'];
    var block = req.body['block'];
    var unblock = req.body['unblock'];
    var b,c;
    if(block == "true") {
        b = true;
        c=false;
    }else if (unblock == "true") {
        c = true;
        b = false;
    }
    db.collection('users').update({_id: ObjectID(req.params.id)}, {
        $set: {
            memberstatus: memberstatus,
            block:b,
            unblock:c,
            updated_at: updated_at
        }
    }, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});


// get mahal data
router.get('/getmahal', function (req, res, next) {
    // find everything
    db.collection('users').find({usertype: 2}).toArray(function (err, result) {
        if (err) throw err
        res.json(result);
    })
});


// single mahal data
router.get('/getmahal/:id', function (req, res, next) {
    // find everything
    db.collection('users').findOne({_id: ObjectID(req.params.id)}, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});


// update mahal

router.put('/updatemahal/:id', function (req, res, next) {
    var task = req.body;
    var mahalname = req.body['mahalname'];
    var password = req.body['password'];
    var email = req.body['email'];
    var mahalcode = req.body['mahalcode'];
    var address = req.body['address'];
    var phone = req.body['phone'];
    var pincode = req.body['pincode'];
    var alternatenumber = req.body['alternatenumber'];
    var mahalstatus = req.body['mahalstatus'];

    if ((!task.mahalcode) || (!task.mahalname) || (!task.pincode) || (!task.phone) || (!task.password) || (!task.alternatenumber) || (!task.address)) {
        res.status(400)
        res.json({
            "error": "Bad data"
        })
    } else {

        bcrypt.hash(password, 11, function (err, hash) {
            db.collection('users').update({_id: ObjectID(req.params.id)}, {
                $set: {
                    mahalstatus: mahalstatus,
                    mahalname: mahalname,
                    password: hash,
                    mahalcode: mahalcode,
                    email: email,
                    address: address,
                    phone: phone,
                    pincode: pincode,
                    usertype: 2,
                    alternatenumber: alternatenumber
                }
            }, function (err, results) {
                if (err) throw err
                res.json(results);
            })
        })
    }
});


// delete mahal
router.delete('/removemahal/:id', function (req, res, next) {
    // find everything
    db.collection('users').remove({_id: ObjectID(req.params.id)}, function (err, results) {
        if (err) throw err
        res.json(results);
    })
});


// update password

router.put('/updatepassword', function (req, res, next) {

    var task = req.body;
    var password = req.body['password'];
    var oldpassword = req.body['oldpassword'];
    var username = req.body['name'];
    if ((!task.password) || (!task.oldpassword) || (!task.name)) {
        res.status(400)
        res.json({"error": "Bad data"})
    } else {
        bcrypt.hash(password, 11, function (err, hash) {
            db.collection('users').findOne({username: username}, function (err, userdata) {
                bcrypt.compare(oldpassword, userdata.password, function (err, respons) {
                    if (respons) {
                        db.collection('users').update({username: username}, {$set: {password: hash}}, function (err, results) {
                            if (err) throw err
                            res.status(200);
                            res.json('{success : true}');
                        })
                    } else {
                        res.status(400);
                        res.json('{Error : invalid data}');
                    }
                })
            })
        })
    }
});


module.exports = router;
