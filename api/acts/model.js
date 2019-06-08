let mongoose = require('mongoose')
let actSubmissionSchema = require('../act-submissions/schema')
let mongooseModel = mongoose.model('act-submission', actSubmissionSchema)

let model = {
    // TODO: customize for regular act
    read(id = null) {
      if(id) return mongooseModel.findById(id).lean().exec()
      else return mongooseModel.find().lean().exec()
    },
    update(id, updatedShow) {
      // "new" option returns modified document rather than the original
      return mongooseModel.findByIdAndUpdate(id, updatedShow, {new: true}).lean().exec()
    },
  }

module.exports = model