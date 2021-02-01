const mongoose =  require('mongoose')

const Schema = mongoose.Schema
const userScheme = new Schema({
userName:String,
password:String,    
passwordConfirm: String,
name:String,
email:String,
phoneNumber:Number,
isAdmin:Boolean
});
module.exports  = mongoose.model( 'user', userScheme,'users')