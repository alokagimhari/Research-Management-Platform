const mongoose = require('mongoose')
const TodoSchema = mongoose.Schema({
    projectName:{
        type: String,
        required:true
    },
    company:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    done:{
        type: Boolean,
        required: true
    },
    approve:{
        type:Boolean,
        required: true
    },
})
module.exports = mongoose.model('todos', TodoSchema)