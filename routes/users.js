var express = require('express');
var _ = require('underscore');
var Useree = require('./model').Useree;
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {
	res.send('hello! this is the users module');
});

router.post('/add',function (req, res) {
	var user = req.body;
	
});

router.get('/:uname', function(req, res) {
	var uname = req.params.uname;
	res.render('users',{uname:uname});
});

module.exports = router;
