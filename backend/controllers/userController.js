const { MailtrapClient } = require("mailtrap");
const asyncHandler = require( "express-async-handler");

const Company = require("../models/companyModel");
const Researcher = require("../models/researcherModel");
const Review = require("../models/Review");
const Message = require("../models/Message");
const Todo = require("../models/ToDo");
const Admin = require('../models/Admin');

const generateToken = require("../utils/generateToken.js");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const  authMiddleware = require ("../middleware/authMiddleware.js");
const nodemailer = require("nodemailer");
process.env.CLIENT_URL = "http://localhost:3000";
const path = require('path');
const multer = require('multer');
const File = require('../models/File');
const Request = require("../models/Request");
const ObjectId = require("mongodb").ObjectId;
const { isValidObjectId } = require("mongoose");

//07/17
const OTP = require("../models/token");
const crypto = require("crypto");

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

router.post("/reslogin",asyncHandler(async (req, res)=>{
  const { username, password} = req.body;
  try{
    const user = await Researcher.findOne({
    username: username
    });
    if (!user) {
      return res.status(400).json({ message: "Username is not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password error" });
    }
    const token = generateToken(user._id);
    if (!token) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }
    //07/17
    if(!user.isVerified){
      
      let tokenObj = await OTP.findOne({userId:user._id});
      if(!tokenObj){
        const Token = await new OTP({
          researcherId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "add your user ",
            pass: "add your pass"
          }
      });
      const mail = await transporter.sendMail({
          from: "example@gmail.com",
          to: username,
          subject: "Account Activation Link",
          html: `  <h5 style="color:#fff; background-color:green; text-align:center;">User Verification</h5>
          <h1>Please click the link to activate your account</h1>
         <a href="${process.env.CLIENT_URL}/users/${user._id}/verify/${Token.token}">${process.env.CLIENT_URL}/users/activate/${token}</a>
      `
      });  
      }
      return res.status(400).send({message:'An email sent to your account please'})
    }
    return res.json({
        _id:user._id,
        first_name :user.first_name,
last_name:user.last_name,
gender:user.gender,
birthDay:user.birthDay,
address:user.address,
state:user.state,
country:user.country,
time_zone:user.time_zone,
contact:user.contact,
email:user.email,
username:user.username,
industry:user.industry,
institute:user.institute,
linkedIn:user.linkedIn,
researchGate:user.researchGate,
password:user.password,
role:user.role,
    token
    })
  }catch(error) {
    return res.status(500).json({ message: "error" });
  }
}));
 



/* router.post("/reslogin",asyncHandler(async (req, res)=> {
  const { username, password } = req.body;

  // basic validation
  
    //check for existing user
    Researcher.findOne({ username }).then((user) => {
      if (!user) return res.status(400).json("Incorrect Email or Password");

      // Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.status(400).json("Incorrect Email or Password");

        const sessUser = { id: user.id, name: user.name, email: user.email ,token:generateToken(user.id) };
     //   req.session.user = sessUser; // Auto saves session data in mongo store

        res.json(sessUser); // sends cookie with sessionID automatically in response
      });
    });
  } 
)); 
router.post("/reslogin",asyncHandler(async(req,res)=>{
  const { username, password} = req.body;

  const user = await Researcher.findOne({
    username: username
    });

    if(user &&(await bcrypt.compare(password,user.password)))
    {
      res.json({
        
        _id:user._id,
        first_name :user.first_name,
last_name:user.last_name,
gender:user.gender,
birthDay:user.birthDay,
address:user.address,
state:user.state,
country:user.country,
time_zone:user.time_zone,
contact:user.contact,
email:user.email,
username:user.username,
industry:user.industry,
institute:user.institute,

linkedIn:user.linkedIn,
researchGate:user.researchGate,
password:user.password,
role:user.role,
      token:generateToken(user._id)
      })
    }

}))
 router.post("/comlogin",asyncHandler(async(req,res)=>{
  const { username, password} = req.body;

  const user = await Company.findOne({
    username: username
    });

    if(user &&(await bcrypt.compare(password,user.password)))
    {
      res.json({
        _id:user._id,
        company_name:user.company_name,
      industry:user.industry,
      business_regNo:user.business_regNo,
      scale:user.scale,
      address:user.address,
      state:user.state,
      country:user.country,
      time_zone:user.time_zone,
      contact:user.contact,
      email:user.email,
      username:user.username,
      pic:user.pic,
      token:generateToken(user._id)
      })
    }

}))
 */



//fetch users
router.get(
  '/',
  authMiddleware,async (req, res) => {
    const users = await Company.find({});

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(500);

      throw new Error('No users found at the moment');
    }
  })

//plaese wait

router.post("/comlogin",asyncHandler(async (req, res)=>{

  const { username, password} = req.body;
  try {
    const finduser = await Company.findOne({
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
 
    if(!finduser.isVerified){
      
      let tokenObj = await OTP.findOne({userId:finduser._id});
      if(!tokenObj){
        const Token = await new OTP({
          companyId: finduser._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "add your user ",
            pass: "add your pass"
          }
      });
      const mail = await transporter.sendMail({
          from: "example@gmail.com",
          to: username,
          subject: "Account Activation Link",
          html: `  <h5 style="color:#fff; background-color:green; text-align:center;">User Verification</h5>
          <h1>Please click the link to activate your account</h1>
         <a href="${process.env.CLIENT_URL}/user/${finduser._id}/verify/${Token.token}">${process.env.CLIENT_URL}/users/activate/${token}</a>
      `
      });  
      }
      return res.status(400).send({message:'An email sent to your account please'})
    }
   return res.json({
      message: "Login Successful",
      _id:finduser._id,
      company_name:finduser.company_name,
      industry:finduser.industry,
     /*  business_regNo:finduser.business_regNo, */
      scale:finduser.scale,
      address:finduser.address,
      state:finduser.state,
      country:finduser.country,
     /*  contact:finduser.contact, */
      email:finduser.email,
      username:finduser.username,
      pic:finduser.pic,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
}));

/* //2023/06/16 profile 
router.get("/profile",authMiddleware,asyncHandler(async(req,res)=>{
  try {
    const user = await Company.findById(req.user._id);
    if(!user)
    throw new Error("You dont have any profile yet");
    res.json(user);
  } catch (error) {
   res.status(500);
  }
}))
 */
router.put("/update",asyncHandler(async (req, res) => {
  const user = await Company.findById(req.user._id);

  if (user) {
    user.company_name = req.body.company_name || user.company_name;
    user.industry = req.body.industry || user.industry;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      company_name: updatedUser.company_name,
      industry : updatedUser.industry,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
}));

//2023/06/22 profile





  //@description     Register new user for Company
//@route           POST /api/users/
//@access          Public
router.post("/companyRegister",asyncHandler(async (req, res)=>{
    const {company_name,
      industry,
      business_regNo,
      scale,
      address,
      state,
      country,
      time_zone,
      contact,
      email,
      username,
      password,
      pic } = req.body;
  
    const userExists = await Company.findOne({ username });
  
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
  
    const user = new Company({
      company_name,
      industry,
      business_regNo,
      scale,
      address,
      state,
      country,
      time_zone,
      contact,
      email,
      username,
      password,
      pic,
    });
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
   /*  const saveUser = await user.save(); */

    try {
      const savedUser = await user.save();
      const token = generateToken(savedUser._id);

      const tokenObj = await new OTP({
        companyId: savedUser._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
      const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "add your user ",
          pass: "add your pass"
        }
    });
  
    const mail = await transporter.sendMail({
        from: "example@gmail.com",
        to: savedUser.username,
        subject: "Account Activation Link",
        html: `  <h5 style="color:#fff; background-color:green; text-align:center;">User Verification</h5>
        <h1>Please click the link to activate your account</h1>
       <a href="${process.env.CLIENT_URL}/user/${savedUser._id}/verify/${tokenObj.token}">${process.env.CLIENT_URL}/user/${savedUser._id}/verify/${tokenObj.token}</a>
    `});
    res.status(201).json({
      message: "Registration successful. An email has been sent to your account for verification.",
      user:{
        id: savedUser._id,
        company_name: savedUser.company_name,
        industry: savedUser.industry,
        business_regNo: savedUser.business_regNo,
        scale:savedUser.scale,
        address:savedUser.address,
        state:savedUser.state,
        country:savedUser.country,
        time_zone:savedUser.time_zone,
        contact:savedUser.contact,
        email:savedUser.email,
        username:savedUser.username,
        pic: savedUser.pic,
      },
      token,
    });
    } catch (error) {
      console.log(error);
    }

    /* if (user) {
      res.status(201).json({
        _id: user._id,
        company_name: user.company_name,
        industry: user.industry,
        business_regNo: user.business_regNo,
        scale:user.scale,
        address:user.address,
        state:user.state,
        country:user.country,
        time_zone:user.time_zone,
        contact:user.contact,
        email:user.email,
        username:user.username,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    } */
  }));

    //@description     Register new user for Researcher
//@route           POST /api/users/
//@access          Public
router.post("/researcherRegister",asyncHandler(async (req, res)=>{
  const {first_name,
    last_name,
    surname,
    gender,
    birthDay,
    address,
    state,
    country,
    time_zone,
    contact,
    industry,
    institute,
    linkedIn,
    researchGate,
    email,
    username,
    password,
    pic } = req.body;

  const userExists = await Researcher.findOne({ username });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = new Researcher({
    first_name,
    last_name,
    surname,
    gender,
    birthDay,
    address,
    state,
    country,
    time_zone,
    contact,
    industry,
    institute,
    linkedIn,
    researchGate,
    email,
    username,
    password,
    pic,
  });

  const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
   
    //07/11 const saveUser = await user.save();

  try {
    const savedUser = await user.save();

    const token = generateToken(savedUser._id);

    // Send the verification email
    const tokenObj = await new OTP({
      researcherId: savedUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "add your user ",
        pass: "add your pass"
      }
  });

  const mail = await transporter.sendMail({
      from: "example@gmail.com",
      to: savedUser.username,
      subject: "Account Activation Link",
      html: `  <h5 style="color:#fff; background-color:green; text-align:center;">User Verification</h5>
      <h1>Please click the link to activate your account</h1>
     <a href="${process.env.CLIENT_URL}/users/${savedUser._id}/verify/${tokenObj.token}">${process.env.CLIENT_URL}/users/${savedUser._id}/verify/${tokenObj.token}</a>
  `
  });
  res.status(201).json({
    message: "Registration successful. An email has been sent to your account for verification.",
    user: {
      _id: savedUser._id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      surname: savedUser.surname,
      gender:savedUser.gender,
      birthDay:savedUser.birthDay,
      address:savedUser.address,
      state:savedUser.state,
      country:savedUser.country,
      time_zone:savedUser.time_zone,
      contact:savedUser.contact,
      industry:savedUser.industry,
      institute:savedUser.institute,
      linkedIn:savedUser.linkedIn,
      researchGate:savedUser.researchGate,
      email:savedUser.email,
      username:savedUser.username,
      pic: savedUser.pic,
    },
    token,
  });
  } catch (error) {
    console.log(error);
  }

  /* if (user) {
    res.status(201).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      surname: user.surname,
      gender:user.gender,
      birthDay:user.birthDay,
      address:user.address,
      state:user.state,
      country:user.country,
      time_zone:user.time_zone,
      contact:user.contact,
      industry:user.industry,
      institute:user.institute,
      linkedIn:user.linkedIn,
      researchGate:user.researchGate,
      email:user.email,
      username:user.username,
      pic: user.pic,
      token: generateToken(user._id),
    });
    const token = generateToken(user._id);
    if (user) {
      res.status(201).json({
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        surname: user.surname,
        gender:user.gender,
        birthDay:user.birthDay,
        address:user.address,
        state:user.state,
        country:user.country,
        time_zone:user.time_zone,
        contact:user.contact,
        industry:user.industry,
        institute:user.institute,

        linkedIn:user.linkedIn,
        researchGate:user.researchGate,
        email:user.email,
        username:user.username,
        pic: user.pic,
        token,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
    //07/17
    const Token = await new OTP({
			researcherId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "add your user ",
        pass: "add your pass"
      }
  });

  const mail = await transporter.sendMail({
      from: "example@gmail.com",
      to: username,
      subject: "Account Activation Link",
      html: `  <h5 style="color:#fff; background-color:green; text-align:center;">User Verification</h5>
      <h1>Please click the link to activate your account</h1>
     <a href="${process.env.CLIENT_URL}/users/${user._id}/verify/${Token.token}">${process.env.CLIENT_URL}/users/${user._id}/verify/${Token.token}</a>
  `
  });
		/* const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url); 

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });

    

  return res.status(200).json({
    message: `A verification mail has been sent to ${username}`,
    token,
  });
  } else {
    res.status(400);
    throw new Error("User not found");
  } */
}));

//07/17
router.get("/users/:id/verify/:token", async (req, res) => {
	try {
		const user = await Researcher.findOne({ _id: req.params.id });
    console.log(user);
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const Tokens = await OTP.findOne({
			researcherId: user._id,
			token: req.params.token,
		});
    console.log(Tokens);
		if (!Tokens) return res.status(400).send({ message: "Invalid link" });

		await Researcher.updateOne({ _id: user._id }, { $set: { isVerified: true } });
		await Tokens.deleteOne();;

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    console.log(error);
		/* res.status(500).send({ message: "Internal Server Error" }); */
	}
});

router.get("/user/:id/verify/:token", async (req, res) => {
	try {
		const user = await Company.findOne({ _id: req.params.id });
    console.log(user);
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const Tokens = await OTP.findOne({
			companyId: user._id,
			token: req.params.token,
		});
    console.log(Tokens);
		if (!Tokens) return res.status(400).send({ message: "Invalid link" });

		await Company.updateOne({ _id: user._id }, { $set: { isVerified: true } });
		await Tokens.deleteOne();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
    console.log(error);
		/* res.status(500).send({ message: "Internal Server Error" }); */
	}
});

  // forgot password for researcher
  router.post("/forgotPasswordRes" ,asyncHandler(async (req, res) => {

    /* const { errors, isValid } = validateUsername(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } */
  
    const { username } = req.body;
  
    try {
      const user = await Researcher.findOne({ username });
  
      if (!user) {
        return res.status(400).json({
          message: `The email ${username} is not associated with any account`,
        });
      }
  
      const token = generateToken(user._id);
  
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  
      const saveUser = await user.save();
    
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "add your user ",
              pass: "add your pass"
            }
        });

        const mail = await transporter.sendMail({
            from: "example@gmail.com",
            to: username,
            subject: "Password reset link",
            html: `  <h5 style="color:#fff; background-color:green; text-align:center;">Paassword reset</h5>
            <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process. \n\n If you did not request this, please ignore this message and your password will remain unchanged.\n</p>
           <a href="${process.env.CLIENT_URL}/passwordreset/${saveUser.resetPasswordToken}">${process.env.CLIENT_URL}/passwordreset/${saveUser.resetPasswordToken}</a>
        `
        });
  
      // eslint-disable-next-line no-unused-vars
       //const Email = await MailtrapClient.send(mail);
   
      return res.status(200).send({
        message: `A password reset mail has been sent to ${username}`,
        token,
      });
    } catch (error) {
     return res.status(500).send({ error: error.message });
    }
  }));
  

//reset password for researcher
router.post("/passwordresetRes/:token" , async (req, res)=> { 

  
    const { password } = req.body;
  
    try {
      const user = await Researcher.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res
          .status(400)
          ({ message: "Password reset token is invalid or has expired." });
      } 
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
  
     const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
  
        // eslint-disable-next-line no-unused-vars
         await user.save();
        
      return  res
          .status(200).json
          ({ message: "Your password has been updated" });
          
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
// forgot password for Company
router.post("/forgotPasswordCom" ,asyncHandler(async (req, res) => {

  const { username } = req.body;

  try {
    const user = await Company.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: `The email ${username} is not associated with any account`,
      });
    }

    const token = generateToken(user._id);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; //expires in an hour

    const saveUser = await user.save();

      const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "add your user ",
            pass: "add your pass"
          }
      });

      const mail = await transporter.sendMail({
          from: "example@gmail.com",
          to: username,
          subject: "Password reset link",
          html: `  <h5 style="color:#fff; background-color:green; text-align:center;">Paassword reset</h5>
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process. \n\n If you did not request this, please ignore this message and your password will remain unchanged.\n</p>
         <a href="${process.env.CLIENT_URL}/passwordresetCom/${saveUser.resetPasswordToken}">${process.env.CLIENT_URL}/passwordresetCom/${saveUser.resetPasswordToken}</a>
      `
      });

    // eslint-disable-next-line no-unused-vars
     //const Email = await MailtrapClient.send(mail);
 
    return res.status(200).send({
      message: `A password reset mail has been sent to ${username}`,
      token,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}));


//reset password for company
router.post("/passwordresetCom/:token" , async (req, res)=> { 


  const { password } = req.body;

  try {
    const user = await Company.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        ({ message: "Password reset token is invalid or has expired." });
    } 
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(user.password, salt);
      user.password = hashPassword;

      // eslint-disable-next-line no-unused-vars
       await user.save();
      
       res
        .status(200).json
        ({ message: "Your password has been updated" });
        
    
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});



router.get('/getResearcherRecord/:id',(req, res,next)=> {
  Researcher.findById(req.params.id) 
  .then((data)=>res.json(data))
  .catch(next);
  });

  router.put("/updateResearcher/:id",(req, res) => {
    Researcher.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "no user found",
                });
            }
            res.status(200).send(user);
        })
        .catch((err) => {
            return res.status(404).send({
                message: "error while updating the post",
            });
        });
  });

router.get('/getCompanyRecord/:id',(req, res,next)=> {
  Company.findById(req.params.id) 
  .then((data)=>res.json(data))
  .catch(next);
  });



router.put("/updateCompany/:id",(req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
          if (!user) {
              return res.status(404).send({
                  message: "no user found",
              });
          }
          res.status(200).send(user);
      })
      .catch((err) => {
          return res.status(404).send({
              message: "error while updating the post",
          });
      });
});


router.get('/allReviews',async (req, res) => {

  const reviews = await Review.findAll({})
  res.status(200).send(reviews)

})
router.post('/addReview/:id', async (req, res) => {

  const id = req.params.id

  let data = {
      product_id: id,
      title:req.body.title,
      rating: req.body.rating,
      text: req.body.text
  }

  const review = await Review.create(data)
  res.status(200).send(review)

}
)

// get product Reviews
router.get('/getProductReviews/:id',  async (req, res) => {

  const id = req.params.id

  const data = await File.findOne({
      include: [{
          model: Review,
          as: 'review'
      }],
      where: { id: id }
  })

  res.status(200).send(data)

})


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 3000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post(
  '/upload',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/getAllFiles', async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

//getfilebyId
router.get('/getfileByID/:fileId', async (req, res) => {
  const { fileId } = req.params;
    
    if (!isValidObjectId(fileId))
      return res.json({ error: "Invalid file Id!" });
  
    const fileone = await File.findById(fileId)
  
   res.status(200).send({success:true,fileone});
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

//newly created 07/10 
router.post(
  '/fileUpload',
  upload.single('file'),
  async (req, res) => {
    const { title, description, user,requests} = req.body;
      const { path, mimetype } = req.file;
    try {  
      /* const { title, description, user,requests} = req.body;
      const { path, mimetype } = req.file; */
      const exisitingUser = await Researcher.findById(user);
      const proposal = await Request.findById(requests);
      if (!exisitingUser) return res.json({ error: "user Not Found!" });
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        requests,
        user
      });
      await file.save();
      exisitingUser.files.push(file._id);
      proposal.files.push(file._id);
      
     await proposal.save();
      await exisitingUser.save(); 
     
      //await Promise.all([proposal.save(), exisitingUser.save()]);
      return res.status(200).send({success: true,message:'file uploaded successfully.'});
    } catch (error) {
      console.error("Error saving file:", error);
    /*  return res.status(400).send({success: false,message:'Error while uploading file. Try again later.'}); */
    return res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.get('/getAllFilesByRequestID/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;
    //const request = await Request.findById(requestId)
    const files = await Request.findById(requestID).populate('files');
/*  const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    ); */  
    res.send(files.files);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/download/:requestID', async (req, res) => {
  try {
    const { requestID } = req.params;
    //const file = await File.findById(req.params.id);
    const file = await Request.findById(requestID).populate('files');
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

router.get("/getFileByUser/:userID",async(req,res)=>{
    
  try {
    const {userID} = req.params;

if(!isValidObjectId(userID))
  return res.json({ error: "Invalid file Id!" })
    const Userrequest= await Researcher.findById(userID).populate("files",'title description file_path');
    

    if (!Userrequest) {
      return res.status(404).send({
        success: false,
        message: "File not found with this id",
      });
    }
    res.send(Userrequest.files);
    /* return res.status(200).send({
      success: true,
      message: "File Request",
      Userrequest.files,
    }); */
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
}
})

router.get("/getReviewforUser/:fileId",async(req,res)=>{
    
  try {
    const {fileId} = req.params;


    const Userrequest= await File.findById(fileId).populate("reviews");
    //const reviews = await Review.findById(Userrequest.file)

   
    res.send(Userrequest.reviews);
  } catch (error) {
    console.log(error);
}
})



router.get("/getRequestByCompany/:userID",async(req,res)=>{
    
  try {
    const {userID} = req.params;

if(!isValidObjectId(userID))
  return res.json({ error: "Invalid file Id!" })
    const Userrequest= await Company.findById(userID).populate("requests");
    

    if (!Userrequest) {
      return res.status(404).send({
        success: false,
        message: "File not found with this id",
      });
    } 
    res.send(Userrequest.requests);
   /*  return res.status(200).send({
      success: true,
      message: "File Request",
      Userrequest.files,
    });  */
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
}
})



// Retrieve and return all Users from the database.
router.get("/users",async(req, res) => {
  Researcher.find()
      .then(notes => {
          res.send(notes);
      }).catch(err => {
          res.status(500).send({
              message: err.message ||
                 "Some error occurred while retrieving users."
          });
      });
});
// Find a single User with a id
router.get("/users/:id",async(req, res) => {
  Researcher.findById(req.params.id)
      .then(note => {
          /* if (!note) {
              return res.status(404).send({
                message: "Note not found with id " 
                 + req.params.id
              });
          } */
          res.status(200).send(note);
      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Note not found with id " 
                    + req.params.id
              });
          }
          return res.status(500).send({
              message: "Error retrieving note with id "
                 + req.params.id
          });
      });
});
// Update a User identified by the id in the request
router.put("/users/:id",(req, res) => {
  Researcher.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
          if (!user) {
              return res.status(404).send({
                  message: "no user found",
              });
          }
          res.status(200).send(user);
      })
      .catch((err) => {
          return res.status(404).send({
              message: "error while updating the post",
          });
      });
});
// Delete a User with the specified id in the request
router.delete("/users/:id",async(req, res) => {
  Researcher.findByIdAndRemove(req.params.id)
      .then(note => {
          // if(!note) {
          //return res.status(404).send({
          // message: "User not found with id " 
          // + req.params.id
          //});
          // }
          res.send({ message: "User deleted successfully!" });
      }).catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "User not found with id " 
                     + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete User with id "
                    + req.params.id
          });
      });
});



// 5. delete product by id

router.delete("/:id",async (req, res) => {

  let id = req.params.id
  
  await File.deleteOne({ where: { id: id }} )

  res.status(200).send('Product is deleted !')

});


router.get("/getAllMessages",async (req, res) => {
  const allMessages = await Message.find()
    .limit(req.query.limit)
    .skip(req.query.skip)
    .sort({ updatedAt: -1 });
  const numberOfDocs = await Message.countDocuments();
  res.status(200).json({ allMessages, numberOfDocs });
});

router.post("/createNewMessage",async (req, res) => {
  const { title, body, username } = req.body;

  try {
    const newMessage = { title, body, username };
    await Message.create(newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.put("/updateMessage",async (req, res) => {
  if (!req.body.id) return res.status(400).json({ message: "Id is required" });
  const oldMessage = await Message.findById(req.body.id);

  if (req.body.title) oldMessage.title = req.body.title;

  if (req.body.body) oldMessage.body = req.body.body;

  if (req.body.username) oldMessage.username = req.body.username;
  try {
    const result = await oldMessage.save();
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

router.delete("/message/:id",async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Id is required" });

  const idExist = await Message.findById(id);
  if (!idExist) {
    return res.status(404).json({ message: "No message found" });
  }
  try {
    await Message.deleteOne({ _id: id });
    res.status(200).json({ id });
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});
router.get('/req', (req, resp)=>{
  Request.find().then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message : e})
  })
})
router.post('/req', (req, resp)=>{
  const request = new Request({
    company_name:req.body.company_name,
    title :req.body.title,
    text: req.body.text,
    deadline: req.body.deadline,
    company : req.body.company
  })
  

  request.save().then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message: e})
  })
})
router.patch('/req/:id', (req, resp) => {
  Request.updateOne({_id: req.params.id}, {
          $set: {
            company_name :req.body.company_name,
            title :req.body.title,
    text: req.body.text,
    deadline: req.body.deadline,
    company : req.body.company
          }
      }).then(data => {
              resp.json(data)
      }).catch(e => {
              resp.json({message: e})
      })
})
router.delete('/req/:id', (req, resp)=>{
  Request.deleteOne({_id: req.params.id})
  .then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message: e})
  })
})
router.get('/todos', (req, resp)=>{
  Todo.find().then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message : e})
  })
})
router.post('/todos', (req, resp)=>{
  const todo = new Todo({
    projectName :req.body.projectName,
    company: req.body.company,
    deadline: req.body.deadline,
      done: false,
      approve:false,
  })
  todo.save().then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message: e})
  })
})

router.post("/get-all-notification",async (req, res) => {
  try {
    const user = await Researcher.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
});

router.patch('/todos/:id', (req, resp) => {
  Todo.updateOne({_id: req.params.id}, {
          $set: {
            projectName :req.body.projectName,
            company: req.body.company,
            deadline: req.body.deadline,
            done: req.body.done,
            approve: req.body.approve
          }
      }).then(data => {
              resp.json(data)
      }).catch(e => {
              resp.json({message: e})
      })
})
router.delete('/todos/:id', (req, resp)=>{
  Todo.deleteOne({_id: req.params.id})
  .then(data => {
      resp.json(data)
  }).catch(e => {
      resp.json({message: e})
  })
})


// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
router.post("/updateProfile",authMiddleware,asyncHandler(async (req, res) => {
  const user = await Company.findById(req.user._id);

  if (user) {
    user.company_name = req.body.company_name || user.company_name;
    user.industry = req.body.industry || user.industry;
    user.contact = req.body.contact || user.contact;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      company_name: updatedUser.company_name,
      industry: updatedUser.industry,
      business_regNo: updatedUser.business_regNo,
      scale:updatedUser.scale,
      address:updatedUser.address,
      state:updatedUser.state,
      country:updatedUser.country,
      time_zone:updatedUser.time_zone,
      contact:updatedUser.contact,
      email:updatedUser.email,
      username:updatedUser.username,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
}));
//06/23
router.get("/user/profile",authMiddleware,asyncHandler(async (req, res) => {
  const user = await Company.findById(req.user.id);
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
}));

router.put("/profile",authMiddleware,asyncHandler(async (req, res) => {
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
}));

//23/06/24 admin login
router.post("/admin",asyncHandler(async (req, res)=>{

  const { username, password} = req.body;
  try {
    const finduser = await Admin.findOne({
      username: username
      });

     
   /*  if (!finduser) {
      return res.status(400).json({ message: "Username is not found" });
    } */

    const passwordMatch = await bcrypt.compare(password, finduser.password);
/* 
    if (!passwordMatch) {
      return res.status(400).json({ message: "Password error" });
    } */

    const token = generateToken(finduser._id);

   /*  if (!token) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    } */
    if(finduser && passwordMatch && token)
    {
      res.json(
        "exist"
      );
    }
    else{
      res.json("notexist")
    }
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
}));

//admin signup
router.post("/adminRegister",asyncHandler(async (req, res)=>{
  const {
    username,
    password,
  } = req.body;

  const userExists = await Admin.findOne({ username });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const admin = new Admin({ 
    username,
    password,
  
  });
  
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  admin.password = hashPassword;
  const saveUser = await admin.save();

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username:admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
}));

router.get("/userCompany",async(req, res) => {
  Company.find()
      .then(notes => {
          res.send(notes);
      }).catch(err => {
          res.status(500).send({
              message: err.message ||
                 "Some error occurred while retrieving users."
          });
      });
});
// Find a single User with a id
router.get("/userCompany/:id",async(req, res) => {
  Company.findById(req.params.id)
      .then(note => {
          /* if (!note) {
              return res.status(404).send({
                message: "Note not found with id " 
                 + req.params.id
              });
          } */
          res.status(200).send(note);
      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Note not found with id " 
                    + req.params.id
              });
          }
          return res.status(500).send({
              message: "Error retrieving note with id "
                 + req.params.id
          });
      });
});
// Update a User identified by the id in the request
router.put("/userCompany/:id",(req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
          if (!user) {
              return res.status(404).send({
                  message: "no user found",
              });
          }
          res.status(200).send(user);
      })
      .catch((err) => {
          return res.status(404).send({
              message: "error while updating the post",
          });
      });
});
// Delete a User with the specified id in the request
router.delete("/userCompany/:id",async(req, res) => {
  Company.findByIdAndRemove(req.params.id)
      .then(note => {
          // if(!note) {
          //return res.status(404).send({
          // message: "User not found with id " 
          // + req.params.id
          //});
          // }
          res.send({ message: "User deleted successfully!" });
      }).catch(err => {
          if (err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "User not found with id " 
                     + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete User with id "
                    + req.params.id
          });
      });
});

router.get("/req/:id",async(req, res) => {
  Request.findById(req.params.id)
      .then(note => {
          /* if (!note) {
              return res.status(404).send({
                message: "Note not found with id " 
                 + req.params.id
              });
          } */
          res.status(200).send(note);
      }).catch(err => {
          if (err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Note not found with id " 
                    + req.params.id
              });
          }
          return res.status(500).send({
              message: "Error retrieving note with id "
                 + req.params.id
          });
      });
});
  module.exports = router;
  