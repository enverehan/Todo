var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var router = express.Router();

var app = express();
app.use(cookieParser());
/*
// session
app.use(cookieParser());
app.use(session({
    secret: 'theSecretKey', 
    resave: true, 
    saveUninitialized: true,
}));
*/

mongoose.model('tasks', {name: String} );

// Lists
router.get('/', function(req, res, next) {
    mongoose.model( 'tasks' ).find(function(err, tasks) {
        res.send( tasks );
    });
});

// Add
router.get('/add', function(req, res, next) {

    var post_data = req.body;
    // res.send( JSON.stringify(post_data) );

});

// Delete
router.get('/delete', function(req, res, next) {
    res.send("Ok!");
});

module.exports = router;
