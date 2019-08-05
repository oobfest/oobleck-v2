let mongoose = require('mongoose')

module.exports = mongoose.Schema({
  actName: String,
  actType: String,
  email: String,
  micNeeds: String,
  hasScript: Boolean,
  needsSoundCheck: Boolean,
  bringingOwnTechPerson: Boolean,
  additionalTechNeeds: String,
  props: String,
  other: String
})