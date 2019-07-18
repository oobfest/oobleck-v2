let mongoose = require('mongoose')
let actSubmissionSchema = require('../act-submissions/schema')
let mongooseModel = mongoose.model('act-submission', actSubmissionSchema)

let model = {

  async getByName(name) {
    return mongooseModel.findOne({name}).lean().exec()
  },

  async create(act){
    act.stamp = 'in'
    act.confirmationStatus = 'yes'
    act.paid = true
    act.usedPromo = true
    act.travelAgreement = 'n/a'
    act.notMessy = true
    act.privateDescription = "n/a"
    act.contact = {
      name: "n/a",
      email: process.env.SUBMISSION_EMAIL,
      phone: 'n/a',
      attending: false,
      role: 'other'
    }
    return mongooseModel.create(act)
  },

  async validatePerformerEmail(email) {
    let acts = await mongooseModel.find({stamp: 'in'}).lean().exec()
    for (act of acts) {
      for (person of act.personnel) {
        if (person.email == email) {
          return true
        }
      }
    }
    return false
  },

  read(id = null) {
    if(id) return mongooseModel.findById(id).lean().exec()
    else return mongooseModel.find({stamp: 'in'}).lean().exec()
  },

  readPublic() {
    return mongooseModel.find({stamp: 'in', confirmationStatus: { $ne: "no"}}, "headliner name image.id showType").lean().exec()
  },

  update(id, updatedShow) {
    // "new" option returns modified document rather than the original
    return mongooseModel.findByIdAndUpdate(id, updatedShow, {new: true}).lean().exec()
  },
}

module.exports = model