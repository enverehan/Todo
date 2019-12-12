var express = require('express');
var router = express.Router();

// For session managment
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.use(cookieParser());

router.post('/', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;

    if( username == 'admin' && password == '123123' ) {

        var response = {
            type: true,
            message: "The login information is true! Please wait!"
        }

        res.send( JSON.stringify(response) );

    } else {

        var response = {
            type: false,
            message: "The wrong username or password!"
        }

        res.send( JSON.stringify(response) );

    }

});

module.exports = router;