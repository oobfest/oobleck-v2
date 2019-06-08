const mongoose = require('mongoose')

let badgeSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  quantity: Number,

  /* Badge Types:
      all
      performer-weekend-upgrade
      performer-upgrade
      volunteer
      staff
      industry
  */
  type: String,

  payment: {},
})

module.exports = badgeSchema