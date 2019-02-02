/*

  Create
  GetAll
  GetById
  Update
  Destroy

*/

module.exports = function(model, overrides = {}) {
  let defaults = {

    async create(request, response) {
      try {
        let results = await model.create(request.body)
        response.json(results)
      } 
      catch(error) {
        console.log(error.message)
        response.status(500).send("Error on create()")
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

    async update(request, response) {
      try {
        let results = await model.update(request.params.id, request.body)
        response.json(results)
      }
      catch(error) {
        console.log(error.message)
        response.status(500).send("Error on update()")
      }
    },

    async destroy(request, response) {
      try { 
        let results = await model.destroy(request.params.id)
        response.json(results)
      }
      catch(error) {
        console.log(error.message)
        response.status(500).send("Error on destroy()")
      }
    }
  }

  return {...defaults, ...overrides}
}