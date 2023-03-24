const express = require('express')

const router = express.Router()
const controller = require('../controller/general')

router.get('/dashboard',controller.dashboard)
router.get('/dash1',controller.dash1)
router.get('/dash2',controller.dash2)
router.get('/dash3',controller.dash3)
router.get('/institution',controller.institute)
router.get('/createusers',controller.createUser)
router.get('/verification',controller.verification)
module.exports = router