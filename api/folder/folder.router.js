const folderController = require('./folder.controller')

const router = require('express').Router()

const { checkAccessToken } = require('../../middleware/jwt')
const { verifyFirebaseToken } = require('../../middleware/firebaseTokenAuth')

router.post('/post', verifyFirebaseToken, folderController.post)
router.post('/get', verifyFirebaseToken, folderController.get)
router.post('/update', verifyFirebaseToken, folderController.update)

module.exports = router