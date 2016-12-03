var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var configDB = require('../config/database.js').url;
var db = mongoose.connect(configDB);

var trans = {
    date : Date,
    catID : Number,
    amount : Number
};

var userSchema = mongoose.Schema({
    // data for local user accounts
    userID : Number,
    local            : {
        email        : String,
        password     : String,
    },
    // data for Google OAuth accounts
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
    },
    transactions     : [trans]
});
var Users = mongoose.model('Users',userSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
	Users.findOne({'userID': 80019}, function(err,doc)
	{
		if(err)
			throw err;
		console.log("Succesful!");
		res.send(JSON.stringify(doc));
	});
});

module.exports = router;