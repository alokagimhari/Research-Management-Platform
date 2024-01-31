const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "title cannot be longer than 100 character"],
  },
  text: {
    type: String,
    required: [true, "Please add a text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approve:{
    required:true,
    type:Boolean,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required:true
  },
});



module.exports = mongoose.model("Review", ReviewSchema);