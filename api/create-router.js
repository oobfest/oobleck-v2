module.exports = (router,  controller) => {

  router.route('/')
    .get(controller.getAll)
    .post(controller.create)

  router.route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.destroy)

  return router
}