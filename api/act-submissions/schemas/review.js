let mongoose = require('mongoose')

let ReviewSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  score: Number,
  notes: String
})

module.exports = ReviewSchema