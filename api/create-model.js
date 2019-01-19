/*

  Create
  GetAll
  GetById
  Update
  Destroy

*/

module.exports = (mongooseModel, overrides = {}) => {

  let defaults = {

    create(documentBody) {
      return mongooseModel.create(documentBody)
    },

    getAll() {
      return mongooseModel.find()
    },

    getById(id) {
      return mongooseModel.findById(id)
    },

    update(id, updatedDocument) {
      // "new" option returns modified document rather than the original
      return mongooseModel.findByIdAndUpdate(id, updatedDocument, {new: true})
    },

    destroy(id) {
      return mongooseModel.findByIdAndDelete(id)
    }

  }

  return {...defaults, ...overrides}
}