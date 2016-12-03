var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var csv = require('csv');

var db = mongoose.connection;

var Schema = mongoose.Schema;
var trans = {
    date : String,
    amount : Number,
    cat   :  String   
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

Users = mongoose.model('Users',userSchema);



/* GET home page. */
router.get('/', function(req, res, next) {
	var data = fs.readFileSync("transaction_data.csv");
	data = data.toString();
	var rows = [];
	while(data.indexOf('\n') != -1)
	{
		rows.push(data.substring(0, data.indexOf('\n')));
		data = data.substring(data.indexOf('\n')+1);
	}
	rows.push(data);
	var newTrans = [];
	for(var i = 0; i < 200; i++)
	{
		var newDate = rows[i].substring(0,rows[i].indexOf(','));
		newDate += "-2016";
		rows[i] = rows[i].substring(rows[i].indexOf(',')+1);
		var newAmount = rows[i].substring(0,rows[i].indexOf(','));
		rows[i] = rows[i].substring(rows[i].indexOf(',')+1);
		var newCat = rows[i];
		newTrans.push({ date: newDate, amount: newAmount, cat: newCat});
	}

	var newUser = new Users({
			userID : 80019
			});
	for(var i = 0; i < 200; i++)
	{
		newUser.transactions.push(newTrans[i]);
	}

	  res.send(JSON.stringify(newUser));
});

module.exports =router;