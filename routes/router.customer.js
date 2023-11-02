const router = require('express').Router()
const controlerCustomer = require('../controler/controler.customer')
const midelwareAuthorization = require('../midelware/midelwareAuthorization')

router.get('/customer', midelwareAuthorization, controlerCustomer.getCustomer)
router.post('/customer', midelwareAuthorization, controlerCustomer.createCustomer)
router.put('/customer/:id', midelwareAuthorization, controlerCustomer.updateCustomer)
router.delete('/customer/:id', midelwareAuthorization, controlerCustomer.deleteCustomer)

module.exports = router