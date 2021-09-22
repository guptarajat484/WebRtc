const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/webrtc',{
    
}).then(()=>{
console.log("Db connected succesfully")
}).catch((e)=>{
    console.log('Error in Db',e)
})


module.exports=mongoose
