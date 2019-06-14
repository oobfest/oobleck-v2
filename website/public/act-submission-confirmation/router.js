let express = require('express')
let router = express.Router()
let submissionModel = require('../../../api/act-submissions/model')

router.get('/confirmation/:submissionId', async (request, response, next)=> {
  let submissionId = request.params.submissionId
  let submission = await submissionModel.read(submissionId)
  response.render('public/act-submission-confirmation', {act: submission})
})

router.post('/confirmation/:submissionId', async (request, response, next)=> {
  let submissionId = request.params.submissionId
  let confirmationStatus = request.body['confirmation-status']

  // set confirmation status of submission
  let submission = await submissionModel.read(submissionId)
  submission.confirmationStatus = confirmationStatus
  let savedSubmission = await submissionModel.update(submissionId, submission)

  // Then
  response.redirect(savedSubmission._id)
})

router.post('/reschedule/:submissionId', async (request, response, next)=> {
  let submissionId = request.params.submissionId
  let newAvailability = request.body.newAvailability
  let updatedSubmission = await submissionModel.update(submissionId, {newAvailability})
  response.render('public/act-submission-confirmation', {act: updatedSubmission})
})

module.exports = router