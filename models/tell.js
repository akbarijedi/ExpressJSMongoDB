const mongoose = require('mongoose')

const tellSchema = new mongoose.Schema({
    tell:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('tell',tellSchema)