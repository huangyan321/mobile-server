var express = require('express');
var router = express.Router();
var Category = require('../../model/Category')
/* GET home page. */
router.post('/categories',async function (req, res, next) {
  var data = await Category.create(req.body)
  res.send(data)
});

module.exports = router;