const routes=require('express').Router()
const authcontroller=require('../controller/auth-controller')
const authMiddleware=require('../middleware/auth-middleware')
const activateController=require('../controller/activate-controller')

routes.post('/send-otp',authcontroller.sendOtp)
routes.post('/verify-otp',authcontroller.verifyOtp)
routes.post('/activate',authMiddleware,activateController.activate)

module.exports=routes