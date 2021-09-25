const crypto=require('crypto')
const smsSid=process.env.SMS_SID
const smsAuthToken=process.env.SMS_AUTH_TOKEN
const twillo=require('twilio')(smsSid,smsAuthToken,{
    lazyLoading:true
})
const HashService=require('./hash-service')

class OtpServices{
    
    async generate_otp(){
        const otp=crypto.randomInt(100000,999999)
        console.log(otp)
        return otp
    }

    async sendBySms(phone,otp) {
        return await twillo.messages.create({
        to:phone,
        from:process.env.SMS_FROM_NUMBER,
        body:`One Time OTP for ${otp}`
        })
    }

   async verify_otp(hashedOtp,data){
       let computehash=await HashService.hashOtp(data)
       return computehash==hashedOtp
    }
}

module.exports=new OtpServices()