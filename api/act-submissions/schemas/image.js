let mongoose = require('mongoose')

let ImageSchema = mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  url:{
    required: true,
    type: String
  },
  deleteUrl: {
    required: true,
    type: String
  }
})

module.exports = ImageSchema