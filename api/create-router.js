let isLoggedIn = require('./is-logged-in')

module.exports = (router,  controller, requireLogin=false) => {

  if(requireLogin) router.use(isLoggedIn)
  
  router.route('/')
    .get(controller.getAll)
    .post(controller.create)

  router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.destroy)

  return router
}