const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
     name:{
        type:String,
        require:true
     },
     category_id:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        require:true
     },
     college_id:{
        type:mongoose.Types.ObjectId,
        ref:'College',
        require:true
     },
     image_id:{
        type:mongoose.Types.ObjectId,
        ref:'Photo',
        require:true
     },
     created_by:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        require:true
     },
     create_at:{
        type:String,
        require:true
     }
})

module.exports = mongoose.model('Prdouct',productSchema)