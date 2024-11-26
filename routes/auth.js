const express = require('express')
const {signUp, signIn} = require('../controller/auth')
const {forgotPassword, resetPassword} = require('../../resetpassword')


const router = express.Router()

router.post('/register', signUp)
router.post('/login', signIn)
router.post('/forgotpassword', forgotPassword)
router.patch('/resetpassword', resetPassword)
module.exports = router;