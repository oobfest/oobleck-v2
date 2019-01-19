require('dotenv').config()

let connectMongoose = require('./app/connect-mongoose')
let createServer = require('./app/create-server')

let setupApp = async ()=> {
  try {
    await connectMongoose(process.env.CONNECTION_STRING)
    await createServer(process.env.PORT)
    console.log("Ready!✨")
  }
  catch(error) {
    if(error.name == "Error") {
      if (error.code == "EADDRINUSE") console.error(`Port ${process.env.PORT} is already in use`)
      else console.error("Server connection error")
    }
    else if (error.name == "MongoNetworkError") {
      console.error("MongoDB Connection Error")
    }
    console.error("Exiting")
  }
}

setupApp()