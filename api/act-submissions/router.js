let express = require('express')
let controller = require('./controller')
let isLoggedIn = require('../is-logged-in')
let router = express.Router()

router.route('/')
  .get(isLoggedIn, controller.read)
  .post(controller.create)

router.route('/edit-public/:id')
  .get(controller.getPublic)

router.route('/promo-code/')
  .post(controller.addPromoCode)

router.route('/review/:userId')
  .get(isLoggedIn, controller.getSubmissionsForReview)

router.route('/reviews/:userId/:submissionId')
  .post(isLoggedIn, controller.createReview)
  .delete(isLoggedIn, controller.removeReview)

router.route('/:id')
  .get(isLoggedIn, controller.read)
  .put(controller.update)
  .delete(isLoggedIn, controller.destroy)


module.exports = router