const express = require('express')
const { signup,login,getUser } = require('../controller/authController')
const jwtAuth = require('../middleware/jwtAuth')
const authRouter = express.Router()


authRouter.post('/signup', signup)

authRouter.post('/login', login)

authRouter.get('/getuser',jwtAuth,getUser)

module.exports = authRouter