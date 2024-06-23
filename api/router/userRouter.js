const express = require('express')
const router = express.Router()
const handler = require('../router_handler/userHandler')
// 登录
router.post('/login', handler.login)
// 注册
router.post('/register', handler.register)
// 获取用户信息
router.get('/info', handler.info)

module.exports = router