const mongoose = require('mongoose')

const Schema = new Schema;

const photoSchema = new Schema({
    type:{
        type:String,
        enum:['.png','.jpg','.jpeg']
    },
    buffer:{
        data:Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Photo',photoSchema);