require('dotenv').config()

let setupMongoose = require('./setup/mongoose')
let setupServer = require('./setup/server')

let setupApp = async ()=> {
  try {
    await setupMongoose(process.env.CONNECTION_STRING)
    await setupServer(process.env.PORT)
    console.log("✨ Ready!")
  }
  catch(error) {
    if(error.name == "Error") {
      if (error.code == "EADDRINUSE") console.error(`Port ${process.env.PORT} is already in use`)
      else console.error("Server connection error \n", error)
    }
    else if (error.name == "MongoNetworkError") {
      console.error("MongoDB Connection Error")
    }
    console.error("Error: ", error.name)
    console.error("Exiting")
  }
}

setupApp()