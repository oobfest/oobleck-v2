require('dotenv').config()

let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')
let actSubmissionModel = require('./api/act-submissions/model')
let acceptedEmailTemplate = require('./email-templates/compile')('acceptance')
let rejectedEmailTemplate = require('./email-templates/compile')('rejection')
let nodemailer = require('./utilities/nodemailer')

async function email() {
  await setupMongoose(process.env.CONNECTION_STRING)
  await setupServer(process.env.PORT)
  let submissions = await actSubmissionModel.read()

  let acceptedSubmissions = submissions.filter(s=> s.stamp == 'in')
  let rejectedSubmissions = submissions.filter(s=> s.stamp =='out')

  for (acceptedSubmission of acceptedSubmissions) {
    let recipient = acceptedSubmission.contact.email
    let subject = acceptedSubmission.name + ", you're in Out of Bounds!"
    let message = acceptedEmailTemplate(acceptedSubmission)
    //nodemailer.sendEmailFromProducers(recipient, subject, message)
    console.log(recipient, subject, message, '\n')
  }

  for (rejectedSubmission of rejectedSubmissions) {
    let recipient = rejectedSubmission.contact.email
    let subject = rejectedSubmission.name + " application status"
    let message = rejectedEmailTemplate(rejectedSubmission)
    //nodemailer.sendEmailFromProducers(recipient, subject, message)
    console.log(recipient, subject, message, '\n')
  }
}

email()