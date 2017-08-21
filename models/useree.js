var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	uname:String,
	alias:String,
	upwd:String,
	cellnum:String,
	team:Array,
	udate:{
		type:Date,
		default:Date.now()
	},
	uptime:Date,
	tasks:{
		now:String,
		undone:Array,
		done:Array
	}
});

userSchema.statics = {
	//遍历所有数据
	fetch: function(cb){
		return this.find({}).sort('uname').exec(cb);
	},
	findById:function (id, cb) {
		return this.findOne({_id:id}).exec(cb);
	},
	findByName:function (uname, cb) {
		return this.findOne({uname:uname}).exec(cb);
	}
};

module.exports = userSchema;