var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('hello! this is the users module');
});
router.get('/:uname', function(req, res, next) {
	var uname = req.params.uname;
	res.render('users',{uname:uname});
});

module.exports = router;
