const mongoose = require('mongoose')

//架构不能写错！
const schema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    //防止被查询到
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val,10)
    }
  }
})

module.exports = mongoose.model('Admin', schema)