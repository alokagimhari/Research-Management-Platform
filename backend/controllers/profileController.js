const asyncHandler = require("express-async-handler");
const Company = require("../models/companyModel");
const generateToken = require("../utils/generateToken.js");
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await Company.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        company_name: user.company_name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });
  
  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await Company.findById(req.user._id);
    if (user) {
      user.company_name = req.body.company_name || user.company_name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        company_name: updateUser.company_name,
        email: updateUser.email,
        token: generateToken(updateUser._id),
      });
    } else {
      res.status(404);
      throw new Error("user Not Found!");
    }
  });

  module.exports = {
    getUserProfile,
    updateUserProfile,
  };