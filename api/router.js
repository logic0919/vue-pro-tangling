const express = require('express')
const router = express.Router()
const handler = require('./router_handler.js')

router.post('/register',handler.register)
router.post('/login', handler.login)
router.get('/infoGet',handler.infoGet)
router.post('/infoChange',handler.infoChange)
router.get('/test',handler.test)

module.exports = router