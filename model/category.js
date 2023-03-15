const mongoose = require('mongoose');

const Schema = new Schema;

const categorySchema = new Schema({
   name:{
    type:String,
    require:true
   },
   photo:{
    type:mongoose.Types.ObjectId,
    ref:'Photo',
    require:true
   },
   college:{
    type:mongoose.Types.ObjectId,
    ref:'College',
    require:true
   },
   description:{
    type:String,
    require:true,
   },
   created_by:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    require:true
   }
})

module.exports =  mongoose.model('Category',categorySchema)