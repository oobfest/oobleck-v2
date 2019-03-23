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

  async getPublic(submissionId) {
    return mongooseModel.findById(submissionId, '-payment -reviews').lean().exec()
  },

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
  },

  async getSubmissionsForReview(userId, userRole) {
    let query = {paid: true}
    if(userRole == 'reviewer') query = {paid: true, showType: {$ne: 'Standup'}}
    if(userRole == 'standup-reviewer') query = {paid: true, showType: {$in: 'Standup'}}
    try {
      let submissionDocuments = await mongooseModel.find(query, '_id name reviews').exec()
      return submissionDocuments.map(s=> { return {
        _id: s._id,
        name: s.name,
        reviewCount: s.reviews.length,
        userReview: s.reviews.find(r=> r.userId == userId)
      }})
    }
    catch(error) {
      console.log(error)
    }
  },

  async createReview(submissionId, review) {
    let submissionDocument = await mongooseModel.findById(submissionId).exec()
    let previousReviewIndex = submissionDocument.reviews.findIndex(r=> r.userId == review.userId)
    if (previousReviewIndex != -1) {
      submissionDocument.reviews[previousReviewIndex] = review
      return submissionDocument.save()
    }
    else return submissionDocument.updateOne({$push: {reviews: review}})
  },

  async removeReview(submissionId, userId) {
    let submissionDocument = await mongooseModel.findById(submissionId).exec()
    return submissionDocument.updateOne({$pull: {reviews: {userId: userId}}})
  }
}



module.exports = createModel(mongooseModel, overrides)