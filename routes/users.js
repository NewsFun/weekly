var express = require('express');
var _ = require('underscore');
var Useree = require('./model').Useree;
var router = express.Router();

/* 登陆校验 */
router.post('/', function(req, res) {
	var user = req.body;
	var uname = user.uname;
	if(uname){
		Useree.findByName(uname, function (err, usee) {
			if(usee){
				if(usee.upwd === user.upwd){
					_user = usee;
					res.json({success:1});
				}else{
					res.json({success:0});
				}
			}else{
				res.json({success:0});
			}
		});
	}else{
		res.json({success:0});
	}
});
/*注册用户*/
router.post('/add',function (req, res) {
	var user = req.body;
	var uname = user.uname;
	if(uname){
		Useree.findByName(uname, function (err, usee) {
			if(usee){
				res.json({success:0});
			}else{
				var _usee = new Useree(user);
				_usee.save(function(err, usee){
					if(err) console.log(err);
					_user = usee;
					res.json({success:1});
				});
			}
		});
	}else{
		res.json({success:0});
	}
});
/*修改信息*/
router.post('/update',function (req, res) {
	var user = req.body;
	var id = user._id;
	if(typeof(id) !== 'undefined'){
		Useree.findById(id, function(err, usee1){
			if(err) console.log(err);
			var _usee = _.extend(usee1, user);
			_usee.save(function(err, usee2){
				if(err) console.log(err);
				res.json({success:1});
			});
		});
	}else{
		res.json({success:0});
	}
});
/*个人首页*/
router.get('/:uname', function(req, res) {
	var uname = req.params.uname;
	Useree.findByName(uname, function (err, usee) {
		if(err) console.log(err);
		if(usee){
			res.render('users', usee);
		}else{
			res.json({success:0});
		}
	});
});

module.exports = router;
