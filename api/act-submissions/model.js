let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')
let nodemailer = require('../../utilities/nodemailer')
let submissionEmailTemplate = require('../../email-templates/compile')('act-submission-staff')
let confirmationEmailTemplate = require('../../email-templates/compile')('act-submission-confirmation')
let mongooseModel = mongoose.model('act-submission', schema)

let sendStaffEmail = function(submission) {
  let emailContent = submissionEmailTemplate(submission)
  nodemailer.sendEmail(process.env.SUBMISSION_EMAIL, `New Act Submission: ${submission.name}`, emailContent)
}

let sendConfirmationEmail = function(submission) {
  let emailContent = confirmationEmailTemplate(submission)
  nodemailer.sendEmail(submission.contact.email, `Application for ${submission.name} recieved`, emailContent)
}

let overrides = {

  async addPayment(submissionId, payment) {
    let submissionDocument = await mongooseModel.findById(submissionId).exec()
    submissionDocument.paid = true
    submissionDocument.payment = payment
    let submission = submissionDocument.toObject()
    sendStaffEmail(submission)
    sendConfirmationEmail(submission)
    return submissionDocument.save()
  },

  async addPromoCode(submissionId, code) {
    if(code == process.env.OOB_PROMO_CODE) {
      let submissionDocument = await mongooseModel.findById(submissionId).exec()
      submissionDocument.paid = true
      submissionDocument.usedPromo = true
      let submission = submissionDocument.toObject()
      sendStaffEmail(submission)
      sendConfirmationEmail(submission)
      return submissionDocument.save()
    }
    else return ({error: "Bad promo code", paid: false})
  }

}



module.exports = createModel(mongooseModel, overrides)