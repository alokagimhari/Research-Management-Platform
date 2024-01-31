const asyncHandler = require( "express-async-handler");
const generateToken = require("../utils/generateToken.js");
const express = require("express");
const router = express.Router();
router.post("/reslogin",asyncHandler(async (req, res)=>{

    const LoggedUser = LoggedUser.aggregate([
      {
         $lookup:
              {
                  from: "companies",
                  localField: "userID",
                  foreignField: "_id",
                  as: "Company"
              },
      
         $lookup:
              {
                  from: "researchers",
                  localField: "userID",
                  foreignField: "_id",
                  as: "Researcher"
              }},
      {
        $addFields: {
         "Username": "$Company.username",
         "Username2": "$Researcher.username",
         "password": "$Company.password",
          "password2":"$Researcher.password"
        }
      },
       {
        $project: {
          Username: 1,
          Username2: 1,
          password:1,
          password2:1
        }
      }
    ])
    
    const { username, password} = req.body;
    try{
      const finduser = await Researcher.findOne({
      username: username
      });
  
  
      if (!finduser) {
        return res.status(400).json({ message: "Username is not found" });
      }
  
      
      const passwordMatch = await bcrypt.compare(password, finduser.password);
  
  
  
      if (!passwordMatch) {
        return res.status(400).json({ message: "Password error" });
      }
  
  
  
      const token = generateToken(finduser._id);
      
  
      if (!token) {
        return res.status(400).json({ message: "Incorrect Credentials" });
      }
   
      res.status(200).json({
        message: "Login Successful",
      })
    }catch(error) {
      return res.status(500).json({ message: error });
    }
  }));