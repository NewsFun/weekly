var express = require('express');
var _ = require('underscore');
var Useree = require('./model').Useree;
var router = express.Router();

/* 登陆校验 */
router.post('/', function(req, res) {
	var user = req.body;
	var uname = user.username;
	if(uname){
		Useree.findByName(uname, function (err, usee) {
			if(usee){
				if(usee.upwd === user.pwd) res.redirect('/');
			}else{
				res.json({success:0});
			}
		});
	}else{
		res.json({success:0});
	}
});

router.post('.add',function (req, res) {
	var user = req.body;
	var id = user._id;
	var _usee;
	if(typeof(id) !== 'undefined'){
		/*修改信息*/
		Useree.findById(id, function(err, usee1){
			if(err) console.log(err);
			_usee = _.extend(usee1, user);
			_usee.save(function(err, usee2){
				if(err) console.log(err);
				res.redirect('/user/'+usee2._id);
			});
		});
	}else{
		/*注册用户*/
		_usee = new Useree(user);
		_usee.save(function(err, usee){
			if(err) console.log(err);
			res.redirect('/user/'+usee._id);
		});
	}
});

router.get('/:uname', function(req, res) {
	var uname = req.params.uname;
	res.render('users',{uname:uname});
});

module.exports = router;
