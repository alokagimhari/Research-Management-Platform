const { check, validationResult } = require("express-validator");
exports.validateRatings = check(
    "rating",
    "Rating Must be a Number between 0 to 10!"
  ).isFloat({ min: 0, max: 10 });
  
  // For formatting Error Message for all Above 🛠🛠
  exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
      return res.json({ error: error[0].msg });
    }
    next();
  };