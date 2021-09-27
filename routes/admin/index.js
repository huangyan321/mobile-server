//通用化crud接口
module.exports = app => {
  var jwt = require('jsonwebtoken')
  var express = require('express');
  var router = express.Router({
    mergeParams: true
  });
  var inflection = require('inflection')
  //增加
  router.post('/', async function (req, res, next) {
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
    var data = await req.Model.find().setOptions(queryOptions).skip((currPage - 1) * pageSize).limit(pageSize)
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
  app.post('/admin/api/login', async function (req, res) {
    const {
      username,
      password
    } = req.body
    const Model = require("../../model/Admin");
    //这里是个对象
    const user = await Model.findOne({
      username
    })
    if (!user) {
      return res.status(422).send({
        message: "用户名不存在"
      })
    }
    const compareRes = require('bcryptjs').compareSync(password, user.password)
    if (!compareRes) {
      return res.status(422).send({
        message: "密码不正确"
      })
    }
    const token = jwt.sign({
      _id: user._id
    }, app.get("publicKey"))
    res.send({
      token
    })
  })
  app.get("/admin/api/getInfo", async function (req, res) {
    const Model = require("../../model/Admin");
    const {
      token
    } = req.query;
    if (!token) {
      return res.status(400).send({
        message: "无效的token"
      })
    }
    const {
      _id
    } = await jwt.verify(token, app.get("publicKey"))
    //通过id查询除了password之外的所有字段
    const userInfo = await Model.findById(_id,'-password')
    res.send(userInfo)
  })
};