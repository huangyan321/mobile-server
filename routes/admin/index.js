module.exports = app => {
  var express = require('express');
  var router = express.Router({
    mergeParams: true
  });
  var Category = require('../../model/Category')
  /* GET home page. */
  router.post('/categories', async function (req, res, next) {
    var data = await Category.create(req.body)
    res.send(data)
  });
  router.put('/categories/:id', async function (req, res, next) {
    console.log(req.body);
    var data = await Category.findByIdAndUpdate(req.params.id,req.body)
    res.send(data)
  });
  router.get('/categories', async function (req, res, next) {
    //加入populate关联查询传入字段的整个内容
    var data = await Category.find().populate("parent").limit(10)
    res.send(data)
  });
  router.get('/categories/:id', async function (req, res, next) {
    var data = await Category.findById(req.params.id)
    res.send(data)
  });
  router.delete('/categories/:id', async function (req, res, next) {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  });

  app.use('/admin/rest/:resource', router)
};