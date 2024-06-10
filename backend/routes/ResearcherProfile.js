const router = require("express").Router();
const getuser = require("../controllers/ResearcherProfile");
const auth = require("../middleware/ResearcherMiddleware");
router.get("/profile", auth, getuser);

module.exports = router;