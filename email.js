require('dotenv').config()

let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')
let actSubmissionModel = require('./api/act-submissions/model')
let showModel = require('./api/shows/model')
let acceptedEmailTemplate = require('./email-templates/compile')('acceptance')
let rejectedEmailTemplate = require('./email-templates/compile')('rejection')
let nodemailer = require('./utilities/nodemailer')

async function setup() {
  await setupMongoose(process.env.CONNECTION_STRING)
  await setupServer(9001)
}

async function sendAcceptanceEmails(submissions) {
  let acceptedSubmissions = submissions.filter(s=> s.stamp == 'in')
  for (acceptedSubmission of acceptedSubmissions) {
    let recipient = acceptedSubmission.contact.email
    let subject = acceptedSubmission.name + ", you're in Out of Bounds!"
    let message = acceptedEmailTemplate(acceptedSubmission)
    //nodemailer.sendEmailFromProducers(recipient, subject, message)
  }
}

async function sendRejectionEmails(submissions) {
  let rejectedSubmissions = submissions.filter(s=> s.stamp =='out')
  for (rejectedSubmission of rejectedSubmissions) {
    let recipient = rejectedSubmission.contact.email
    let subject = rejectedSubmission.name + " application status"
    let message = rejectedEmailTemplate(rejectedSubmission)
    //nodemailer.sendEmailFromProducers(recipient, subject, message)
  }
}

async function acceptanceAndRejectionEmails() {
  await setup()
  let submissions = await actSubmissionModel.read()
  sendAcceptanceEmails(submissions)
  sendRejectionEmails(submissions)
}

async function sendConfirmationEmails() {
  console.log("MEOW")
  await setup()
  let submissions = await actSubmissionModel.read()
  let acts = submissions.filter(s=>
    s.stamp == 'in' && !s.showType.includes('Standup') &&
    (s.confirmationStatus == 'yes' || s.confirmationStatus == 'reschedule'))
  let shows = await showModel.read()
  for (act of acts) {
    let actName = act.name
    let email = act.contact.email
    let days = []

    // Get days they're performing
    for(show of shows) {
      for (showAct of show.acts) {
        if (showAct.name == act.name) {
          days.push(show.day)
        }
      }
    }

    console.log(actName, email, days)
  }
}

sendConfirmationEmails()