const mongoose = require('mongoose')

let hostSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  bio: String,
  experience: String,
  videoUrl: String,
  imageUrl: String,
  deleteImageUrl: String,
  availability: Array,
  canAttendMeeting: Boolean
})

module.exports = hostSchema