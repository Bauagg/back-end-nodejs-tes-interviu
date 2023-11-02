const router = require('express').Router()
const controlerSalles = require('../controler/controler.salles')
const midelwareAuthorization = require('../midelware/midelwareAuthorization')

router.get('/salles', midelwareAuthorization, controlerSalles.getSalles)
router.post('/salles', midelwareAuthorization, controlerSalles.createSalles)

module.exports = router