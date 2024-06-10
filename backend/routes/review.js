const 
  ReviewRoute= require("../controllers/ReviewController");
  


  const router = require("express").Router({ mergeParams: true });
  
  //Invoked middleware
  const advanceResults = require("../middleware/advanceResults");
  const authmiddleware  = require("../middleware/authMiddleware");
  
  //Review model
  const Review = require("../models/Review");
  
  router
    .route("/")
    .get(
      advanceResults(Review, {
        path: "productId",
        select: "title description",
      }),
      ReviewRoute.getReviews
    )
    .post(authmiddleware, ReviewRoute.createReview);
  
    
  router
    .route("/:id")
    .get(ReviewRoute.getReview)
    .put(authmiddleware, ReviewRoute.updateReview)
    .delete(authmiddleware, ReviewRoute.deleteReview);
  router.route("/update-rating/:id").put(authmiddleware, ReviewRoute.updateRating);
  
  module.exports = router;