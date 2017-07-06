var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Weekly' });
});

router.post('/login',function (req, res, next) {
	var user = req.body.username;
	res.render('index',{
		title:'Weekly',
		user:user
	});
});

module.exports = router;
