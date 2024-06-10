const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    file_path: {
      type: String,
      required: true
    },
    file_mimetype: {
      type: String,
      required: true
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:"Review"}],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Researcher",
      required:true 
    },
    requests:[{type:mongoose.Schema.Types.ObjectId,ref:"Request"}],
  },{
    timestamps: true
  },
);

fileSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });

  next();
});
fileSchema.virtual("Reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: true,
});

fileSchema.virtual("Researchers", {
  ref: "Researcher",
  localField: "_id",
  foreignField: "files",
});

fileSchema.virtual("Requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "files",
});

module.exports = mongoose.model("File", fileSchema);