const express= require('express')
const router = express.Router()

const notificationController = require('../controllers/notificationController')

router.post('/notification',notificationController.sendNotification)

module.exports = router