const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
	researcherId: {
		type: mongoose.Schema.Types.ObjectId,
		
		ref: "Researcher",
		unique: true,
	},
    companyId: {
		type: mongoose.Schema.Types.ObjectId,
		
		ref: "Company",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
},{
    timestamps: true
  },);

module.exports = mongoose.model("token", tokenSchema);