var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
	creator:String,
	title:String,
	comments:String,
	hunter:Array,
	state:{
		type:Number,
		default:0
	},
	creatime:Date,
	update:[{
		updatime:{
			type:Date,
			default:Date.now()
		},
		updatmsg:String
	}],
	endtime:Date
});

taskSchema.pre('save', function (next) {
	if(this.isNew){
		this.creatime = Date.now();
	}
	next();
});

taskSchema.statics = {
	findById:function (id, cb) {
		return this.findOne({_id:id}).exec(cb);
	}
};

module.exports = taskSchema;