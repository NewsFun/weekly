var express = require('express');
var _ = require('underscore');
var Taskee = require('./model').Taskee;
var router = express.Router();
var _user = {};
/* GET home page. */
router.get('/', renderIndex);

router.post('/', renderIndex);

router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/task', function(req, res) {
	res.render('task',{uname:_user.name});
});

router.get('/task.com/:id',function (req, res) {
	var id = req.params.id;
	if(id){
		Taskee.findById(id, function (err, data){
			if(err) console.log(err);
			var dt = JSON.parse(JSON.stringify(data));
			dt.creatime = formatDate(data.creatime);
			dt.uname = _user.name;
			dt.iftake = ifTakeTask(dt.hunter);
			res.render('tshow', dt);
		});
	}
});

router.post('/task.add', function (req, res) {
	var takeeObj = req.body;
	var id = takeeObj._id;
	var _takee;
	if(typeof(id) !== 'undefined'){
		// 修改日程
		Taskee.findById(id, function(err, takee){
			if(err) console.log(err);
			_takee = _.extend(_takee, takeeObj);
			_takee.save(function(err, takee){
				if(err) console.log(err);
				res.redirect('/task.com/'+takee._id);
			});
		});
	}else{
		// 创建日程
		_takee = new Taskee(takeeObj);
		_takee.save(function(err, takee){
			if(err) console.log(err);
			res.redirect('/task.com/'+takee._id);
		});
	}
});

router.delete('/task.delete', function (req, res) {
	var id = req.query.id;
	if(id){
		takee.remove({_id: id}, function (err, takee) {
			if(err) console.log(err);
			res.json({success:1});
		});
	}
});

function ifTakeTask(hunter) {
	var len = hunter.length;
	if(len<1) return false;
	for(var i = 0;i<len;i++){
		if(hunter[i] === _user.name) return true;
		return false;
	}
}

function renderIndex(req, res, next) {
	_user.name = req.body.username;
	var dt = [];
	Taskee.fetch(function (err, data) {
		if(err) console.log(err);
		for(var i = 0;i<data.length;i++){
			var n = JSON.parse(JSON.stringify(data[i]));
			n.creatime = formatDate(data[i].creatime);
			dt.push(n);
		}
		res.render('index',{
			tasks:dt,
			uname:_user.name
		});
	});
}

function formatDate(date) {
	var ld = date.toLocaleDateString();
	var lt = date.toLocaleTimeString();
	return ld+' '+lt;
}
module.exports = router;
