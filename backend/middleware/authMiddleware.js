const jwt = require( "jsonwebtoken");
const User = require( "../models/companyModel");
process.env.JWT_KEY='secret';
const asyncHandler = require( "express-async-handler");
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token,process.env.JWT_KEY);

     //this works fine
      //req.user = await User.findById(decoded._id);
      //new test one 
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("fail");
    }
  }

});

module.exports = authMiddleware ;
  