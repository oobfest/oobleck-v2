// Checks if the user has permission
module.exports = function(allowedRoles) {
  return function(request, response, next) {
    let userRoles = request.user.roles
    let userHasPermission = userRoles.some((role)=> allowedRoles.includes(role))
    if (userHasPermission) next()
    else next(Error("You do not have permission to do that :("))
  }
}