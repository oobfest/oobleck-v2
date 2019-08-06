let express = require('express')
let userModel = require('../../api/users/model')
let submissionModel = require('../../api/act-submissions/model')
let router = express.Router()

// Don't router.use(isLoggedIn), it will catch for pages that don't exist
let isLoggedIn = require('./is-logged-in')
let isRole = require('./is-role')


router.get('/badges', isLoggedIn, (request, response)=> {
  response.render('private/badges')
})

router.get('/screener-submissions', isLoggedIn, (request, response)=> {
  response.render('private/screener-submissions')
})

router.get('/user/reviews/:username', isLoggedIn, isRole(['admin', 'staff']), async (request, response)=> {
  let username = request.params.username
  let submissions = await submissionModel.read()
  let releventSubmissions = []
  let votes = {yes:0, good:0, meh:0, nah:0, veto:0}
  for(let i=0; i<submissions.length; i++) {
    for(let j=0; j<submissions[i].reviews.length; j++) {
      if (submissions[i].reviews[j].username === username) {
        releventSubmissions.push(submissions[i])
        switch(submissions[i].reviews[j].score) {
          case  3: votes.yes++;  break;
          case  2: votes.good++;  break;
          case  1: votes.meh++;  break;
          case  0: votes.nah++;  break;
          case -1: votes.veto++; break;
        }
      }
    }
  }
  response.render('private/act-submissions/reviews-by-user', {submissions: releventSubmissions, username: username, votes: votes})
})

router.get('/users', isLoggedIn, isRole(['admin', 'staff']), (request, response)=> {
  response.render('private/users', {key: process.env.PASSWORD_KEY})
})

router.get('/users/:id', isLoggedIn, async (request, response, next)=> {
  try {
    let account = await userModel.read(request.params.id)
    response.render('private/users/account', { account })
  }
  catch(error) {
    next(error)
  }
})

router.get(['/submissions'], isLoggedIn, (request, response)=> {
  response.render('private/stub')
})


router.use('/acts', require('./acts/router'))
router.use('/act-submissions', require('./act-submissions/router'))
router.use('/calendar', require('./calendar/router'))
router.use('/character-showcase-submissions', require('./character-showcase-submissions/router'))
router.use('/emails', require('./emails/router'))
router.use('/hosts', require('./hosts/router'))
router.use('/shows', require('./shows/router'))
router.use('/tech-needs-submissions', require('./tech-needs-submissions/router'))
router.use('/travel-info-submissions', require('./travel-info-submissions/router'))
router.use('/volunteers', require('./volunteers/router'))
router.use('/set-workshops', require('./set-workshops/router'))


module.exports = router