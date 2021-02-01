const mongoose=require('mongoose');

const doctorSchema=mongoose.Schema({
    userName:String,
    password:String,    
    name:String,
    email:String,
    phoneNumber:String,
    isAdmin:Boolean
});

module.exports=mongoose.model('addDoctor', doctorSchema,'AddDoctor');