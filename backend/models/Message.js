const mongoose = require("mongoose");

const { Schema } = mongoose;
const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    researcherId: {
      type: mongoose.Types.ObjectId,
      ref: "Researcher",
    },
    isSenderCompany: {
      type: Boolean,
      required: true,
    },
    isSenderResearcher: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);