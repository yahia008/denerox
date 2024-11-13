const express = require("express")
const connectDB = require("./config/connect")
const cors = require('cors');
const router = require('./routes/greets')
const authRouter = require('./routes/auth')
const greet = require('./routes/greets')
const dotenv = require('dotenv')


const app = express()
app.use(cors());
app.use(express.json())
connectDB()
app.use('/api', greet)
app.use('/api', router)
app.use('/api', authRouter)


module.exports = app