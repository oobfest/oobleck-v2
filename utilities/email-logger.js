let winston = require('winston')

let logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `email.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    })
  ],
  exitOnError: false
})

module.exports = logger