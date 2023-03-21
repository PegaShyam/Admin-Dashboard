const express = require('express')

const router = express.Router();

const general_controller = require('../controller/general')
const user_controller = require('../controller/user')

router.get('/',general_controller.entry)

router.get('/login', user_controller.login)

router.get('/dashboard', user_controller.dashboard)

router.get('/signup',user_controller.createUser)

router.get('/profile', user_controller.profile)

module.exports = router;