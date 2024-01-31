const {removeMessage,getAllMessages,addMessagebyCompany,AddedMessagesByCompanyId,addMessagebyResearcher,getMessagesByCompanyId,getMessagesByResearcherId, markMessageAsRead} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addCompanyMessage",addMessagebyCompany);
router.post("/addResearcherMessage",addMessagebyResearcher);
router.delete("/remove/:id",removeMessage);
router.get("/getCompanyMessage/:companyId",getMessagesByCompanyId);
router.get("/allmsg",getAllMessages);
router.get("/addedMsg/:companyId",AddedMessagesByCompanyId);
router.get("/getResearcherMessage/:researcherId",getMessagesByResearcherId);
router.patch("/:messageId/markAsRead",markMessageAsRead);
module.exports = router;