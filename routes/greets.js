const express = require('express')
const {greet} = require('../controller/greet')



const router = express.Router()
router.get('/greet', greet)

module.exports = router;