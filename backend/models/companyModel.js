const mongoose = require( "mongoose");
const bcrypt = require( "bcryptjs");
const companySchema = mongoose.Schema({
    company_name : {
        type:String,
        required:true,
    },
    industry :{
        type : String,
        required:true
    },
    business_regNo:{
        type : String,
        required:true,
    },
    scale:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    state:{
        type : String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    time_zone:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
      },
      role:{
        type:String,
        default:"Company",
      },
      //07/17
      isVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      requests :[{type:mongoose.Types.ObjectId,ref:"Request"}],
      messages:[{type:mongoose.Types.ObjectId,ref:"Message"}]
}, {timestamps: true})


companySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  companySchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  });

/* companySchema.virtual("Requests",{
    ref:"Request",
    localField:"_id",
    foreignField:"user",
    justOne:true,
}); */


const Company = mongoose.model("Company", companySchema)

module.exports = Company;