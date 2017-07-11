var express = require('express');
var _ = require('underscore');
var Taskee = require('./model').Taskee;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Weekly' });
});

router.get('/task', function(req, res, next) {
	res.render('task', { title: 'Weekly' });
});

router.post('/index', function (req, res, next) {
	var user = req.body.username;
	res.render('index',{
		title:'Weekly',
		user:user
	});
});

router.post('/task.add', function (req, res, next) {
	var id = req.body._id;
	var takeeObj = req.body;
	var _takee;
	
	if(id !== 'undefined'){
		// 修改日程
		Taskee.findById(id, function(err, timee){
			if(err) console.log(err);
			_takee = _.extend(_takee, takeeObj);
			_takee.save(function(err, timee){
				if(err) console.log(err);
				// res.redirect('/task.com/'+timee._id);
			});
		});
	}else{
		// 创建日程
		_takee = new Taskee({
			creator: takeeObj.creator,
			title: takeeObj.title,
			comments: takeeObj.comments
		});
		_takee.save(function(err, timee){
			if(err) console.log(err);
			// res.redirect('/task/new/'+timee._id);
		});
	}
});

router.delete('/task.delete', function (req, res) {
	var id = req.query.id;
	if(id){
		Timee.remove({_id: id}, function (err, timee) {
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		});
	}
});
module.exports = router;
