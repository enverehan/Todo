var express = require('express');
var router = express.Router();

// For session managment
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');

router.get('/', function(req, res, next) {

    app.use(cookieParser());
    app.use(session({secret: ''}));

    res.send('');

});

module.exports = router;