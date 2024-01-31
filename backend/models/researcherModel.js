const mongoose = require( "mongoose");
const bcrypt = require( "bcryptjs");
const researcherSchema = mongoose.Schema({
    first_name : {
        type:String,
        required:true,
    },
    last_name :{
        type : String,
        required:true
    },
    surname:{
        type : String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    birthDay:{
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
    industry:{
        type: String,
        
    },
    institute:{
        type: String,
    },
    linkedIn:{
        type: String,
    },
    researchGate:{
        type: String,
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
        default:"Researcher",
      },
      //07/17
      isVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      files: [{
        type: mongoose.Types.ObjectId,
        ref: "File",
       required:true
      }],
      messages:[{type:mongoose.Types.ObjectId,ref:"Message"}]
}, {timestamps: true})


researcherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // will encrypt password everytime its saved
  researcherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  });

researcherSchema.virtual("Files",{
    ref:"File",
    localField:"_id",
    foreignField:"user",
});



const Researcher = mongoose.model("Researcher", researcherSchema)

module.exports = Researcher;