const routes=require('express').Router()
const authcontroller=require('../controller/auth-controller')

routes.post('/send-otp',authcontroller.sendOtp)
routes.post('/verify-otp',authcontroller.verifyOtp)


module.exports=routes