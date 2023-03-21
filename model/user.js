const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
 phone:{
    type:String,
    require:true,
    unique:true
 },
 name:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true,
    unique:true
 },
 college_mail:{
    type:String,
    require:true
 },
 verified:{
    type:String,
    enum:['Pending','Verified','Rejected'],
    require:true
 },
 collegeId:{
    type:String,
    require:true
 },
 userRole:{
    type:Number,
    require:true,
    enum:[0,1]
 },
 state:{
   type:String,
   require:true
 },
 city:{
   type:String,
   require:true
 },
 dob:{
   type:String,
   require:true
 },
 gender:{
   type:String,
   enum:['male','female']
 },
 status:{
   type:Boolean,
   require:true
 },
 waLogin:{
   type:Boolean,
   require:true
 },
 password:{
   type:String,
   require:true
 }
})

module.exports = mongoose.model('User',userSchema)