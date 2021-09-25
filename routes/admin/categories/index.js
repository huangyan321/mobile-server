var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("<h1>我是admin路由下的分类路由</h1>");
});

module.exports = router;