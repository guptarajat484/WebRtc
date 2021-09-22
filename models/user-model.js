const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    phone:{
        type:String,
        required:true
    },
    isactivated:{
        type:Boolean,
        required:false,
        default:false
    }
},{
    timestamps:true
})



module.exports=mongoose.model('User',userschema)