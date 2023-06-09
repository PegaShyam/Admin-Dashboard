const express = require('express')
const isAuth = require('../middleware/isAuth')
const router = express.Router();

const general_controller = require('../controller/general')
const user_controller = require('../controller/user')

const user = require('../model/user')

const {check,body} = require('express-validator')

router.get('/',general_controller.entry)

router.get('/login', user_controller.login)


router.get('/signup',user_controller.signup)

router.get('/profile', isAuth,user_controller.profile)

router.get('/logout',isAuth,user_controller.logout);

router.post('/signup',[
  check('name').custom(async(value,{req})=>{
    let res = await user.find({where:{name:value}})
    if(res.length>0){
        return Promise.reject('1')
    }
  }),
  check('email').custom(async(value,{req})=>{
    let res = await user.find({where:{mail:value}})
    if(res.length>0){
        return Promise.reject('2')
    }

  }).normalizeEmail(),
  check('phone').custom(async(value,{req})=>{
    if(value.length  != 10){
      return Promis.reject('3')
    }
  }),
  check('phone').custom(async(value,{req})=>{
    let res = await user.find({where:{phone:value}})
    if(res.length>0){
      return Promise.reject('4')
  }
  }),
  check('password', '5') 
    .isLength({ min: 10 })
    .trim() 
    ,body('confirm').custom((value, { req }) => {
        if (value === req.body.password) {
            return true
        } else
            throw new Error('6')
    }),
],user_controller.createUser)
router.post('/login',user_controller.validateUser)

router.get('/profile',isAuth,user_controller.profile)
router.get('/editProfile',isAuth,user_controller.editProfile)
router.get('/change_pass1',isAuth,user_controller.changePassword)
router.post('/change_pass',isAuth,user_controller.confirmUpdate)
router.post('/updatePassword',isAuth,[ check('password', '5') 
.isLength({ min: 10 })
.trim() 
,body('confirm').custom((value, { req }) => {
    if (value === req.body.password) {
        return true
    } else
        throw new Error('6')
})],user_controller.updatePassword)

router.get('/forgot1',user_controller.forgot1)
router.post('/confirm_mail',user_controller.confirmMail)
module.exports = router;