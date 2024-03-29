const mongoose = require('mongoose')


const schema = mongoose.Schema({
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Category"
  }],
  title: {
    type: String
  },
  editText: {
    type: String
  }
})

module.exports = mongoose.model('Article', schema)