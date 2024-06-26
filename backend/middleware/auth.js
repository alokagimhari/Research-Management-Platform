const User = require("../models/companyModel");
const jwt = require("jsonwebtoken");
process.env.JWT_SECRET = 'secret'
exports.IsAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  if (!token) return res.json({ error: "Invalid Token" });

  const jwtToken = token?.split("Bearer ")[1];

  if (!jwtToken) return res.json({ error: "invalid Token" });

  const jwtRes = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = jwtRes;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User Not Found" });

  req.user = user;
  next();
};
