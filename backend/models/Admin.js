const mongoose = require( "mongoose");
const bcrypt = require( "bcryptjs");
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true})


AdminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  });


const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin;