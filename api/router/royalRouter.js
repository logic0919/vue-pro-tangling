const express = require('express')
const router = express.Router()
const handler = require('../router_handler/royalHandler')

// 获取所有royal
router.get('/all', handler.getAll)
// 获取单个royal
router.get('/id', handler.getById)
// 搜索royal
router.get('/search', handler.search)
module.exports = router