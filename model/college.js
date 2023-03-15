const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    college_name:{
        type:String,
        require:true,
        unique:true
    },
    admin:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
    }
})

module.exports = mongoose.model('College',collegeSchema);