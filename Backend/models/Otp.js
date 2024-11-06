const mongoose=require('mongoose');
const otpSchema=new mongoose.Schema({
    uidaiNo:{
        type:String
    },
    code:{
        type:String
    },
    expiresIn:{
        type:Number
    }
});
const Otp=mongoose.model("Otp",otpSchema);
module.exports=Otp;