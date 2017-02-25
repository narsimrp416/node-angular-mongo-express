var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.keys = "12345"
  res.render('index', { title: 'Express' });
});

module.exports = router;
