require('dotenv').config()

let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')
let actSubmissionModel = require('./api/act-submissions/model')
let showModel = require('./api/shows/model')
let acceptedEmailTemplate = require('./email-templates/compile')('acceptance')
let rejectedEmailTemplate = require('./email-templates/compile')('rejection')
let dateConfirmationTemplate = require('./email-templates/compile')('date-confirmation')
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
  //sendAcceptanceEmails(submissions)
  //sendRejectionEmails(submissions)
}

async function sendConfirmationEmails() {
  await setup()
  let submissions = await actSubmissionModel.read()
  let acts = submissions.filter(s=>
    s.stamp == 'in' && !s.showType.includes('Standup') &&
    (s.confirmationStatus == 'yes' || s.confirmationStatus == 'reschedule'))
  let shows = await showModel.read()
  for (act of acts) {
    let actName = act.name
    let days = []

    // Get days they're performing
    for(show of shows) {
      for (showAct of show.acts) {
        if (showAct.name == act.name) {
          days.push(show.day)
        }
      }
    }

    let recipient =  act.contact.email
    let subject = "OoB Show Days, Perks, Social, and Hotel Discount"
    let message = dateConfirmationTemplate({actName, days})
    //nodemailer.sendEmailFromProducers(recipient, subject, message)
  }
}

async function getStuff() {

  // Set up server
  await setup()

  // Get acts
  let submissions = await actSubmissionModel.read()
  let acts = submissions.filter(s=>
    s.stamp == 'in' &&
    (s.confirmationStatus == 'yes' || s.confirmationStatus == 'reschedule'))

  // Get shows
  let allShows = await showModel.read()

  for (act of acts) {
    let emailData = {name: act.name, shows: []}

    // Get days they're performing
    for(show of allShows) {
      for (showAct of show.acts) {
        if (showAct.name == act.name) {
          show.duration = showAct.duration  // Include duration for specific act
          emailData.shows.push(show)
        }
      }
    }

    console.log('\n', emailData.name)
    for (show of emailData.shows)
      console.log(`${show.day}, ${show.startTime} at ${show.venue} for ${show.duration} minutes`)
  }
}

getStuff()