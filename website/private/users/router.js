
router.post('/password/:objectId', (request, response)=> {
  let objectId = request.params.objectId
  let oldPassword = request.body['old-password']
  let newPassword = request.body['password']

  if(oldPassword) {
    userApi.changePassword(objectId, oldPassword, newPassword, (error)=> {
      if(error) response.render('error', {error: error})
      response.render('login', { info: "Password changed! You can now log in."})
    })
  }
  else {
    userApi.setPassword(objectId, newPassword, (error)=> {
      if(error) response.render('error', {error: error})
      response.render('login', { info: "Password set! You can now log in." })
    })
  }
})