var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	uname:String,
	upwd:String,
	cnum:String,
	udate:Date
});