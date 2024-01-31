const {
    addReview,
    updateReview,
    removeReview,
    getReviewByFile,
    getAllReview,
    getReviewsById
  } = require("../controllers/review");
 const authmiddleware = require("../middleware/auth");
  const { validateRatings, validate } = require("../middleware/validator");
  
  const router = require("express").Router();
  
  router.post("/add/:fileId",validateRatings, validate, addReview);
 router.patch("/:reviewId",validateRatings, validate, updateReview);
  router.delete("/:reviewId",removeReview);
  router.get("/get-reviews-by-file/:fileId",getReviewByFile);
  router.get("/allReviews",getAllReview);
  router.get("/:reviewId",getReviewsById)
  
  module.exports = router;