const mongoose = require('mongoose')

//架构不能写错！
const schema = mongoose.Schema({
  name: {
    type: String
  },
  items: [{
    image: {
      type: String
    },
    url: {
      type: String
    }
  }]
})

module.exports = mongoose.model('Ad', schema)