const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name:{
        type:String,
        require:true
    },
   description:{
    type:String,
    require:true
   },
   college_id:{
    type:mongoose.Types.ObjectId,
    ref:'College',
    require:true
   },
   date:{
    type:String,
    require:true
   },
   created:{
    type:String,
    require:true
   },
   createdBy:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      require:true
   }

})

module.exports = mongoose.model('Event',eventSchema)