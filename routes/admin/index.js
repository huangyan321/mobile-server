var express = require('express');
var router = express.Router();
var categories = require('./categories/index');
router.use('/categories', categories)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<h1>我是一级admin路由</h1>");
});

module.exports = router;
