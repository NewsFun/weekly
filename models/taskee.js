var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	creator:String,
	title:String,
	comments:String
});