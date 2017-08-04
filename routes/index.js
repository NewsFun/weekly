var express = require('express');
var _ = require('underscore');
var Taskee = require('./model').Taskee;
var router = express.Router();
/* GET home page. */
router.get('/', renderIndex);

router.post('/', renderIndex);

router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/task', function(req, res) {
	res.render('task',{uname:_user.name});
});

router.get('/task/:id',function (req, res) {
	var id = req.params.id;
	if(id){
		Taskee.findById(id, function (err, data){
			if(err) console.log(err);
			var dt = JSON.parse(JSON.stringify(data));
			dt.creatime = formatDate(data.creatime);
			dt.iftake = ifTakeTask(dt.hunter);
			dt.uname = _user.name;
			res.render('tshow', dt);
		});
	}
});

router.post('/task.add', function (req, res) {
	var bod = req.body;
	var id = bod._id;
	var _takee;
	if(typeof(id) !== 'undefined'){
		// 修改日程
		Taskee.findById(id, function(err, takee1){
			if(err) console.log(err);
			_takee = _.extend(takee1, bod);
			_takee.save(function(err, takee2){
				if(err) console.log(err);
				res.redirect('/task/'+takee2._id);
			});
		});
	}else{
		// 创建日程
		_takee = new Taskee(bod);
		_takee.save(function(err, takee){
			if(err) console.log(err);
			res.redirect('/task/'+takee._id);
		});
	}
});

router.post('/task.take', function (req, res) {
	var bod = req.body;
	var id = bod._id;
	if(typeof(id)!=='undefined'){
		Taskee.findById(id, function (err, data) {
			if(err) console.log(err);
			data.hunter.push(bod.name);
			data.save(function(err, takee){
				if(err) console.log(err);
				res.json({success:1});
			});
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
