const mongoose=require('mongoose');

const patientSchema=mongoose.Schema({
  name: String,
  email:String,
  mobileNumber:String,
  age:Number,
  gender:String,
  city:String,
});

module.exports=mongoose.model('patient', patientSchema,'Patient');