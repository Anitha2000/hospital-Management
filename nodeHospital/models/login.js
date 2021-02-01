const mongoose =  require('mongoose')

const Schema = mongoose.Schema
const userScheme = new Schema({
userName:String,
password:String,    
isAdmin:Boolean
});
module.exports  = mongoose.model( 'login', userScheme,'Login')