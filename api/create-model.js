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
      // Returns a Promise, not a Query so no need for lean() or exec()
      return mongooseModel.create(documentBody)
    },

    read(id = null) {
      if(id) return mongooseModel.findById(id).lean().exec()
      else return mongooseModel.find().lean().exec()
    },

    update(id, updatedDocument) {
      // "new" option returns modified document rather than the original
      return mongooseModel.findByIdAndUpdate(id, updatedDocument, {new: true}).lean().exec()
    },

    destroy(id) {
      return mongooseModel.findByIdAndDelete(id).lean().exec()
    }

  }

  return {...defaults, ...overrides}
}