const mongoose=require('mongoose');

const patientSchema=mongoose.Schema({
    _id:req.params.id,
    userName:req.body.userName,
    password:req.body.password,    
    passwordConfirm: req.body.passwordConfirm,
    name:req.body.name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    isAdmin:req.body.isAdmin
});

module.exports=mongoose.model('updateDoctor', patientSchema,'AddDoctor');