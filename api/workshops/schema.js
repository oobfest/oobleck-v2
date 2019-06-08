let mongoose = require('mongoose')
let Mixed = mongoose.Schema.Types.Mixed
let imageSchema = require('../act-submissions/schemas/image')
let studentSchema = require('./schemas/student')

let workshopSchema = mongoose.Schema({
  name: String,
  domain: String,
  description: String,
  teacher: String,
  bio: String,
  affiliation: String,

  image: {
    type: imageSchema,
    required: false
  },

  day: String,
  venue: String,
  time: String,

  capacity: Number,
  sold: {
    type: Number,
    default: 0
  },
  refunded: {
    type: Number,
    default: 0
  },
  auditCapacity: Number,
  auditSold: {
    type: Number,
    default: 0
  },
  auditRefunded: {
    type: Number,
    default: 0
  },

  students: [studentSchema]

})

module.exports = workshopSchema