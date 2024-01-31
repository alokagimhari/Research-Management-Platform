const jwt = require( "jsonwebtoken");

process.env.JWT_KEY = 'secret'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
};

module.exports= generateToken;