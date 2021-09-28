module.exports = () => {
  const modelAdmin = require("../model/Admin");
  var jwt = require('jsonwebtoken');
  var assert = require('http-assert')
  return async (req, res, next) => {
    var token = req.headers.authorization;
    assert(token, 400, "token不存在，请重新登录！");
    var {
      _id
    } = await jwt.verify(token, req.app.get("publicKey"));
    assert(_id, 422, "token异常，请重新登录！");
    var user = await modelAdmin.findById(_id);
    assert(user, 423, "用户不存在，请重新登录！");
    next()
  }
}