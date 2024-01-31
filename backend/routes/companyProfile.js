const router = require("express").Router();
const getuser = require("../controllers/companyProfile");
const auth = require("../middleware/authMiddleware");
router.get("/profile", auth, getuser);

module.exports = router;