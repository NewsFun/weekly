var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	uname:String,
	nickname:String,
	upwd:String,
	cellnum:String,
	udate:Date,
	uptime:Date
});

module.exports = userSchema;