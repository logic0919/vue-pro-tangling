const express = require('express')
const router = express.Router()
const handler = require('../router_handler/commentHandler')

router.get('/getComments', handler.getCommentsHandler)
router.post('/addComment', handler.addCommentHandler)
router.post('/like', handler.likeHandler)
router.post('/canclelike', handler.canclelikeHandler)

module.exports = router