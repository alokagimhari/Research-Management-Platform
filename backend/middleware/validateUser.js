const Validator = require("validator");
const isEmpty = require("is-empty");

const validateInput = (data) => {
    const errors = {};
    //convert empty fiels to string so we can use validator
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
  
    //username check
  
  
    //username check
    if (Validator.isEmpty(data.username)) {
      errors.username = "username field is required";
    } else if (!Validator.isusername(data.username)) {
      errors.username = "username field is invalid";
    }
  
    //password check
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else if (!Validator.isLength(data.password, { min: 5 })) {
      errors.password = "Password must be at least 5 characters";
    }
  
    return {
      errors,
      isValid: isEmpty(errors),
    };
  };

  const validateUsername = (data) => {
    const errors = {};
    //convert empty fiels to string so we can use validator
    data.username = !isEmpty(data.username) ? data.username : "";
  
    //username check
    if (Validator.isEmpty(data.username)) {
      errors.username = "username field is required";
    } else if (!Validator.isusername(data.username)) {
      errors.username = "username field is invalid";
    }
  
    return {
      errors,
      isValid: isEmpty(errors),
    };
  };

  const validatePassword = (data) => {
    const errors = {};
    //convert empty fiels to string so we can use validator
    data.password = !isEmpty(data.password) ? data.password : "";
  
    //password check
    if (Validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    } else if (!Validator.isLength(data.password, { min: 5 })) {
      errors.password = "Password must be at least 5 characters";
    }
  
    return {
      errors,
      isValid: isEmpty(errors),
    };
  };

  module.exports = { validateInput,validateUsername, validatePassword };
