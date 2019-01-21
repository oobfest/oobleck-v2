let axios = require('axios')

// Only for test!
axios.defaults.baseURL = 'http://localhost:' + process.env.PORT  

// Stop Axios from throwing errors based on HTTP status code
axios.defaults.validateStatus = ()=> true

module.exports = axios