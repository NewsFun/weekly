var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	uname:String,
	nickname:String,
	upwd:String,
	cellnum:String,
	udate:Date,
	uptime:Date,
	tasks:Array
});

userSchema.statics = {
	//遍历所有数据
	fetch: function(cb){
		return this.find({}).sort('uname').exec(cb);
	},
	//通过id查找
	findById:function (id, cb) {
		return this.findOne({_id:id}).exec(cb);
	}
};

module.exports = userSchema;