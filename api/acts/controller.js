let model = require('./model')

let controller = {

  async create(request, response) {
    try {
      let act = request.body
      let results = await model.create(act)
      response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on create()")
    }
  },

  async validatePerformerEmail(request, response) {
    try {
      let email = request.body.email
      let results = await model.validatePerformerEmail(email)
      response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on validatePerformerEmail()")
    }
  },

  async read(request, response) {
    try {
      // Optional 'id' parameter
      let id = request.params.id
      if(id) {
        let results = await model.read(id)
        if(!results) response.status(404).json({message: "Not found"})
        else response.json(results)
      }
      else {
        let results = await model.read(null)
        response.json(results)
      }
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on read()")
    }
  },

  async readPublic(request, response) {
    try {
      let results = await model.readPublic()
      response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on readPublic()")
    }
  },

  async update(request, response) {
    try {
      let id = request.params.id
      let show = request.body
      let results = await model.update(id, show)
      response.json(results)
    }
    catch(error) {
      console.log(error.message)
      response.status(500).send("Error on update()")
    }
  },

}

module.exports = controller