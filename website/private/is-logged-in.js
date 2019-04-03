module.exports = function (request, response, next) {
  if (request.isAuthenticated()) {
    response.locals.user = request.user
    next()
  }
  else {
    response.render('public/login', {
      info: { message: "You must be logged in to view " + request.originalUrl },
      attemptedUrl: request.originalUrl
    })
  }
}