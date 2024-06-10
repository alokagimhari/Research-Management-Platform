const User = require("../models/researcherModel");
const getuser = async (req, res) => {

    try {
      const user = await User.findById(req.user._id).select("-password");
  
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  
  module.exports = getuser;