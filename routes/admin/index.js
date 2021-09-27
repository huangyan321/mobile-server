//通用化crud接口
module.exports = app => {
  var express = require('express');
  var router = express.Router({
    mergeParams: true
  });
  var inflection = require('inflection')
  //增加
  router.post('/', async function (req, res, next) {
    console.log(req.Model,req.body);
    var data = await req.Model.create(req.body)
    res.send(data)
  });
  //修改
  router.put('/:id', async function (req, res, next) {
    var data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(data)
  });
  //获取列表
  router.get('/', async function (req, res, next) {
    var pageSize = req.query.pageSize ? Number(req.query.pageSize) : ''
    var currPage = req.query.currPage ? Number(req.query.currPage) : ''
    const queryOptions = {};
    if (req.Model.modelName === 'Category') {
      //加入populate关联查询传入字段的整个内容
      queryOptions.populate = 'parent'
    }
    var data = await req.Model.find().setOptions(queryOptions).skip((currPage-1) * pageSize).limit(pageSize)
    var total = await req.Model.find().count()
    res.send({
      data,
      total
    })
  });
  //条件查询
  router.get('/:id', async function (req, res, next) {
    var data = await req.Model.findById(req.params.id)
    res.send(data)
  });
  //删除
  router.delete('/:id', async function (req, res, next) {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  });

  app.use('/admin/api/rest/:resource', function (req, res, next) {
    //将路由名规范化为模块名称
    const modelName = inflection.classify(req.params.resource);
    console.log(modelName);
    //引入对应模块
    const model = require(`../../model/${modelName}`);
    //将模块挂在到req中
    req.Model = model;
    next();
  }, router)
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../static'
  })
  app.use('/admin/api/upload', upload.single('file'), async function (req, res) {
    const file = req.file;
    file.url = `http://127.0.0.1:3000/static/${file.filename}`
    res.send(file)
  })
};