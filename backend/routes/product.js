const {
    getProducts,
    getProduct,    
  } = require("../controllers/product");
  
  //Invoked middleware.
  const advanceResults = require("../middleware/advanceResults");
 
  
  //Product model
  const File = require("../models/File");
  
  //Include other resource Router
  const reviewRouter = require("./review");
  
  const router = require("express").Router();
  
  router
    .route("/")
    .get(
      advanceResults(File, {
        path: "Reviews",
        select: "title",
      }),
      getProducts
    )
  
  router.use("/:productId/reviews", reviewRouter);
  
  router
    .route("/:productId")
    .get(getProduct)
  
  module.exports = router;