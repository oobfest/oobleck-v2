let passport = require('passport')
let passportLocal = require('passport-local')
let mongoose = require('mongoose')
let User = mongoose.model('User', require('../api/users/schema'))

module.exports = server => {
  server.use(passport.initialize())
  server.use(passport.session())
  passport.use(new passportLocal.Strategy(User.authenticate()))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
  return passport
}