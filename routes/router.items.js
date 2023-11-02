const router = require('express').Router()
const controlerItem = require('../controler/controler.item')
const midelwareAuthorization = require('../midelware/midelwareAuthorization')
const midelwareAdmin = require('../midelware/midelware-admin')

router.get('/item', controlerItem.getItem)
router.get('/item/:id', controlerItem.getItemsById)
router.post('/item', midelwareAuthorization, midelwareAdmin, controlerItem.createItems)
router.put('/item/:id', midelwareAuthorization, midelwareAdmin, controlerItem.updateItem)
router.delete('/item/:id', midelwareAuthorization, midelwareAdmin, controlerItem.deleteItem)

module.exports = router