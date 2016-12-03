var express = require('express');
var configDB = require('/Users/Tim/Desktop/Hackathonf16/hackathonf16/config/database.js').url;
console.log("CONFIGDB: " + configDB);
var router = express.Router();
var mongoose = require('mongoose');

var db = mongoose.connection;
mongoose.connect(configDB);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write(db.count());
});

module.exports = router;