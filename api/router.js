let express = require('express')
let router = express.Router()

// CORS
router.use((request, response, next)=>{
  response.header("Access-Control-Allow-Origin", "http://localhost:8080")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.header("Access-Control-Allow-Credentials", "true")
  next()
})

router.use('/act-submissions', require('./act-submissions/router'))
router.use('/acts', require('./acts/router'))
router.use('/badges', require('./badges/router'))
router.use('/cats', require('./cats/router'))
router.use('/character-showcase-submissions', require('./character-showcase-submissions/router'))
router.use('/hosts', require('./hosts/router'))
router.use('/screener-submissions', require('./screener-submissions/router'))
router.use('/shows', require('./shows/router'))
router.use('/stripe', require('./stripe/router'))
router.use('/users', require('./users/router'))
router.use('/volunteers', require('./volunteers/router'))
router.use('/workshops', require('./workshops/router'))

router.get('/promo/:code', (request, response)=>{
  let attemptedPromoCode = request.params.code
  let actualPromoCode = process.env.OOB_BAE_PROMO_CODE
  let valid = (attemptedPromoCode == actualPromoCode)
  response.send({valid})
})

router.get('/', (request, response)=> {
  response.send({ok: true})
})

module.exports = router