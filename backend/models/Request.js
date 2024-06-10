const mongoose = require("mongoose");
const RequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "title cannot be longer than 100 character"],
  },
  text: {
    type: String,
    required: [true, "Please add a description"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required:true   
  } ,
  files: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required:true
  }]
 /*  company:{
    type:String
  } */
},
{
    timestamps: true,
  });



module.exports = mongoose.model("Request", RequestSchema);