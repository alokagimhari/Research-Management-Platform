const { isValidObjectId } = require("mongoose");
const { getAverageRatings } = require("../utils/helpers");
const File =  require("../models/File");
const Review =  require("../models/Review");
const { response } = require("express");

// SUBMIT REVIEW
const addReview = async (req, res) => {
    const { fileId } = req.params;
    const { title,text, rating,approve } = req.body;
 
    if (!isValidObjectId(fileId)) return res.json({ error: "Invalid FileID!" });
  
    const file = await File.findOne({ _id: fileId });
  
    if (!file) return res.json({ error: "File Not Found!" });

    // Create Review
    const newReview = new Review({
      product: file._id,
      title,
      text,
      rating,
      approve
    });
  
    file.reviews.push(newReview._id);
    await file.save();
    await newReview.save();
  
    const reviews = await getAverageRatings(file._id);
  
    res.json({ reviews, message: "Thank You For Submitting Your Review 🙂" });
  };

  const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { title,text,rating,approve } = req.body;
  
    if (!isValidObjectId(reviewId))
      return res.json({ error: "Invalid Review Id!" });
  
    const review = await Review.findOne({ _id: reviewId });
    if (!review) return res.json({ error: "No Review Found" });
  
    review.text = text;
    review.title = title;
    review.rating = rating;
    review.approve = approve;
    await review.save();
    res.json({ message: "Review Updated 👍🏻" });
  };

  const removeReview = async (req, res) => {
    const { reviewId } = req.params;
  
   /*  const userId = req.user; */
  
    if (!isValidObjectId(reviewId))
      return res.json({ error: "Invalid Review Id!" });
  
    const review = await Review.findOne({_id: reviewId });
    if (!review) return res.json({ error: "Review Not Found!" });
  
    const movie = await File.findById(review.product).select("reviews");
    movie.reviews = movie.reviews.filter((rId) => rId.toString() !== reviewId);
  
    await Review.findByIdAndDelete(reviewId);
  
    await movie.save();
    res.json({ message: "Review Removed Successfully 👍🏻" });
  };

  // GET REVIEWS BY File
const getReviewByFile = async (req, res) => {
    const { fileId } = req.params;
  
    if (!isValidObjectId(fileId))
      return res.json({ error: "Invalid file Id!" });
  
    const file = await File.findById(fileId)
      .populate({
        path: "reviews",
        populate: { path: "owner", select: "company_name" },
      })
      .select("reviews title");
  
    const reviews = file.reviews.map((r) => {
      const {title,text, rating, _id: reviewId } = r;
     // const { company_name, _id: ownerId } = owner;
      return {
        id: reviewId,
       /*  owner: {
          id: ownerId,
          company_name,
        }, */
        title,
        text,
        rating,
      };
    });
  
    res.json({ file: { title: file.title, reviews } });
  };

const getReviewsById = async (req, res) => {
  const { reviewId } = req.params;
  
  if (!isValidObjectId(reviewId))
    return res.json({ error: "Invalid file Id!" });

  const file = await Review.findById(reviewId)

 res.send(file);
};
  

  //// GET ALL REVIEWS
  const getAllReview = async(req, res) => {
    Review.find()
        .then(reviews => {
            res.send(reviews);
        }).catch(err => {
            res.status(500).send({
                message: err.message ||
                   "Some error occurred while retrieving users."
            });
        });
      }
  
  module.exports = {
    addReview,
    removeReview,
    getReviewByFile,
    getAllReview,
    getReviewsById,
    updateReview
  };