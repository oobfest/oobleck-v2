require('dotenv').config()

let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')
let actSubmissionModel = require('./api/act-submissions/model')
let showModel = require('./api/shows/model')
let acceptedEmailTemplate = require('./email-templates/compile')('acceptance')
let rejectedEmailTemplate = require('./email-templates/compile')('rejection')
let dateConfirmationTemplate = require('./email-templates/compile')('date-confirmation')
let performerShowDetailsTemplate = require('./email-templates/compile')('performer-show-details')
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
    s.stamp == 'in' && !s.headliner && !s.showType.includes('Standup') &&
    (s.confirmationStatus == 'yes' || s.confirmationStatus == 'reschedule'))

  // Get shows
  let allShows = await showModel.read()

  for (act of acts) {
    let emailData = {name: act.name, shows: []}

    // Get days they're performing
    for(show of allShows) {
      for (showAct of show.acts) {
        if (showAct.name == act.name) {

          let newShow = {day: show.day}

          newShow.duration = showAct.duration  // Include duration for specific act

          // Format venue name
          if (show.venue == 'Hideout Up') newShow.venue = 'the Hideout Theatre (Upstairs)'
          else if (show.venue == 'Hideout Down') newShow.venue = 'the Hideout Theatre (Downstairs)'
          else if (show.venue == 'Fallout') newShow.venue = 'Fallout Theater'
          else if (show.venue == 'ColdTowne') newShow.venue = 'ColdTowne Theater'
          else if (show.venue == 'Velveeta') newShow.venue = 'The Velveeta Rooom'
          else newShow.venue = show.venue

          // Format show time
          newShow.startTime = formatTime(show.startTime)
          emailData.shows.push(newShow)
        }
      }
    }

    emails = []
    for(person of act.personnel) {
      emails.push(person.email)
    }
    let recipients = "sld.potato@gmail.com" //act.contact.email
    let subject = act.name + " Performance Times"
    let message = performerShowDetailsTemplate({name: act.name, shows: emailData.shows})
    console.log(emails, '\n', message, '\n')
    //nodemailer.sendEmailFromProducers(recipients, subject, message)
  }
}

let formatTime = function(time) {
  time = String(time)
  return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
}

getStuff()