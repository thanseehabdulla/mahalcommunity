var express = require('express');

var bodyParser = require('body-parser');

var path = require('path');

var cors = require('cors');

// Oauth2
var http = require('http');

var passport = require('passport');

var util = require('util');
var expressValidator = require('express-validator')
var auth = require("./auth");
var oauth = require("./oauth");
var registration = require("./registration")

var index = require('./routes/index');
var tasks = require('./routes/task');
var uploads = require('./routes/upload');

var app = express();

var port = 4000;

//view Engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client')));

app.use('/img', express.static(path.join(__dirname, 'public/images')));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


app.use('/files', express.static(path.join(__dirname, 'public/uploads')));

app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(passport.initialize())

app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


app.use('/api', passport.authenticate('accessToken', {session: true}), tasks);

app.use('/', index);


app.post('/oauth/token', oauth.token)

app.post('/users', registration.registerUser)


app.use('/upload', uploads)

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

app.get('/restricted', passport.authenticate('accessToken', {session: false}), function (req, res) {
    res.send("Yay, you successfully accessed the restricted resource!")
})

if (app.path != '/api' && app.path != '/secret' && app.path != '/upload') {
    app.get('**', function (req, res, next) {
        res.render('index.html');
    });
}


app.listen(port, function () {
    console.log('server started at port:' + port);
});


