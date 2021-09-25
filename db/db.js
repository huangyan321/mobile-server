const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/"
const options = {
  user: "root",
  pass: "175947",
  dbName: "moba"
}

module.exports = mongoose.connect(url, options, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("数据库连接成功");
  }
})