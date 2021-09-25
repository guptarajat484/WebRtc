const tokenService=require('../services/token-service')
module.exports=async function(req,res,next){
try{
    const {accessToken}=req.cookies
    if(!accessToken){
        throw new Error()
    }
    console.log(accessToken)
    const userData=await tokenService.verifyAccessToken(accessToken)
    if(!userData){
        throw new Error()
    }
   
    req.user=userData
    
    next()

}catch(e){
    res.status(401).send({'message':'Invalid Token'})
}

}