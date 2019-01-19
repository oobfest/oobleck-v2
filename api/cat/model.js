let createModel = require('../create-model')

module.exports = function(mongooseModel) {
  return createModel(mongooseModel)
}