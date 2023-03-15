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
 mail:{
    type:String,
    require:true,
    unique:true
 },
 college_mail:{
    type:String,
    require:true
 },
 verification_status:{
    type:String,
    enum:['Pending','Verified','Rejected'],
    require:true
 },
 college_id:{
    type:mongoose.Types.ObjectId,
    ref:'College',
    require:true
 },
 user_role:{
    type:Number,
    require:true,
    enum:[0,1]
 }
})

module.exports = mongoose.model('User',userSchema)