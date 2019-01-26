const mongoose = require('mongoose')

module.exports = connectionString=> {
  // Don't "useFindAndModify" so Mongoose avoids depreciated MongoDB command
  // https://github.com/Automattic/mongoose/issues/6880
  // https://github.com/Automattic/mongoose/issues/6922#issue-354147871
  mongoose.set('useFindAndModify', false)
  let options = { useNewUrlParser: true }

  let database = mongoose.connection
  database.once('open', ()=> {
    console.log("⚡️ Database connected")
  })

  return mongoose.connect(connectionString, options)
}