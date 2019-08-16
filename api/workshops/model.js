let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')

let mongooseModel = mongoose.model('workshop', schema)
let overrides = {

  async getPublic(workshopId) {
    let publicFields = 'name description teacher bio affiliation image day venue time capacity sold refunded price auditCapacity auditSold auditRefunded auditPrice'
    return mongooseModel.findById(workshopId, publicFields).lean().exec()
  },

  async addStudent(workshopId, student) {
    let workshop = await mongooseModel.findById(workshopId).exec()
    workshop.students.push(student)
    workshop.markModified('students')
    if(student.auditing) workshop.auditSold += Number(student.quantity)
    else workshop.sold += Number(student.quantity)
    return workshop.save()
  },

  async refund(workshopId, studentEmail, refunded) {
    let workshop = await mongooseModel.findById(workshopId).exec()
    let index = workshop.students.map(s=> s.email).indexOf(studentEmail)
    workshop.students[index].refunded = refunded
    if(refunded) {
      workshop.sold -= workshop.students[index].quantity
      if(workshop.refunded == undefined) workshop.refunded = 1
      else workshop.refunded++
    }
    else {
      workshop.sold += workshop.students[index].quantity
      workshop.refunded--
    }
    workshop.markModified('students')
    return workshop.save()
  }
}

module.exports = createModel(mongooseModel, overrides)
