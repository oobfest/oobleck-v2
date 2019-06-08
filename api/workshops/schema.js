const mongoose = require('mongoose')
const Mixed = mongoose.Schema.Types.Mixed

let workshopSchema = mongoose.Schema({
  name: String,
  domain: String,
  description: String,
  teacher: String,
  bio: String,
  affiliation: String,
  imageUrl: String,
  deleteImageUrl: String,

  day: String,
  venue: String,
  time: String,

  capacity: Number,
  sold: Number,
  refunded: Number,
  auditCapacity: Number,
  auditSold: Number,

  students: [{
    name: String,
    email: String,
    phone: String,
    auditing: Boolean,
    quantity: Number,
    refunded: Boolean,
    payment: {}
  }]

})

module.exports = workshopSchema