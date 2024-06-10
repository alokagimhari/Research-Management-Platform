const router = require("express").Router();
const Researcherlogin = require("../controllers/userController.js");
const Companylogin = require("../controllers/userController.js");
const companyRegister = require("../controllers/userController.js");
const researcherRegister = require("../controllers/userController.js");
const updateProfile = require("../controllers/userController.js");
const forgotPassword = require("../controllers/userController.js");
const passwordreset = require("../controllers/userController.js");
const authmiddleware = require ("../middleware/authMiddleware.js");

router.post("/reslogin",Researcherlogin);
router.post("/comlogin",Researcherlogin);
router.post("/companyRegister",companyRegister);
router.post("/researcherRegister",researcherRegister);
//router.post("/profile",authmiddleware,updateProfile);
router.post("/forgotPassword",forgotPassword);
router.post("/passwordreset/:token",passwordreset);

module.exports = router;