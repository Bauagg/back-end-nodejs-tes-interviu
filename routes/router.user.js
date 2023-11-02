const router = require('express').Router()
const controlerUser = require('../controler/controler.user')

router.post('/register', controlerUser.register)
router.post('/login', controlerUser.login)

module.exports = router