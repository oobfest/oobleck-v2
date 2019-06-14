let express = require('express')
let router = express.Router()

router.get('/act-submission-edit/:submissionId', async(request, response, next)=> {
  let submissionId = request.params.submissionId
  response.render('public/act-submission-edit', {submissionId})
})

module.exports = router