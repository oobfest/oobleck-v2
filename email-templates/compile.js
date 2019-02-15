let pug = require('pug')
let path = require('path')

module.exports = function(template) {
  return pug.compileFile(`email-templates/${template}.pug`)
}