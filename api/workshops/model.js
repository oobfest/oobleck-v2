let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('workshop', schema)
let overrides = {

  async getPublic(workshopId) {
    let publicFields = 'name description teacher bio affiliation image day venue time capacity sold refunded auditCapacity auditSold auditRefunded price'
    return mongooseModel.findById(workshopId, publicFields).lean().exec()
  },

  async addStudent(workshopId, student) {
    let workshop = await mongooseModel.findById(workshopId).exec()
    workshop.students.push(student)
    workshop.markModified('students')
    if(student.auditing) workshop.auditSold += Number(student.quantity)
    else workshop.sold += Number(student.quantity)
    return workshop.save()
  }

}

module.exports = createModel(mongooseModel, overrides)