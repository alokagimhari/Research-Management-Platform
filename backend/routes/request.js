const {
    addRequest,
    updateRequest,
    removerequest,
    getrequestById,
    getAllRequest,
    getrequestByCompanyId
  } = require("../controllers/RequestController");

  
  const router = require("express").Router();
  
  //router.post("/add/:companyId", addRequest);
  router.post("/add", addRequest);
 router.patch("/update/:requestId", updateRequest);
  router.delete("/remove/:requestId",removerequest);
  //router.get("/get-reviews-by-file/:fileId",getReviewByFile);
  router.get("/",getAllRequest);
  router.get("/getRequest/:requestId",getrequestById)
  router.get("/getCompanyFile/:companyId",getrequestByCompanyId);
  module.exports = router;