let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  type: [String],
  referral: String,
  volunteeredBefore: Boolean,
  performing: Boolean,
  hours: Number,
  availability: [String],
  attendingOrientation: Boolean,
  notes: String,

  // Driver
  car: {
    carType: String,
    passengerCount: Number,
    licensePlateNumber: String
  },

  // Tech
  tech: {
    previousExperience: String,
    hasTechedOobBefore: Boolean
  }
})