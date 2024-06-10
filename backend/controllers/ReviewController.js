const asyncHandler = require( "express-async-handler");
const { isValidObjectId } = require("mongoose");
const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
const Review = require("../models/Review");
const File = require("../models/File");

const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.productId) {
    const findProject = await File.findById(req.params.productId);
    if (!findProject)
      throw createError(
        404,
        `Project is not found with id of ${req.params.productId}`
      );

    const ProjectReviews = await Review.find({
      productId: req.params.productId,
    }).populate({
      path: "userId",
      select: "company_name username",
    });

    return res.status(200).send({
      status: "success",
      count: ProjectReviews.length,
      data: ProjectReviews,
    });
  } else {
    res.status(200).send(res.advanceResults);
  }
});

const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "userId",
    select: "company_name username",
  });

  if (!review)
    throw createError(404, `Review is not found with id of ${req.params.id}`);

  res.status(200).send({
    status: "success",
    count: review.length,
    data: review,
  });
});

const createReview = asyncHandler(async (req, res, next) => {
  const Project = await File.findById(req.params.productId);

  if (!Project)
    throw createError(
      404,
      `Project is not found with id of ${req.params.productId}`
    );

  const isReview = await Review.findOne({
    productId: req.params.productId,
    userId: req.user._id,
  });

  if (isReview) throw createError(409, `Already Reviwed`);

  const review = await Review.create({
    ...req.body,
    productId: req.params.productId,
    userId: req.user._id,
  });

  res.status(201).send({ status: "success", data: review });
});

const updateReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    throw createError(404, `Review is not found with id of ${req.params.id}`);

  //check if review belongs to user created or user is admin

  const findReview = await Review.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!findReview && req.user.role !== "admin")
    throw createError(400, "Not authorized to update this review");

  const editReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const updatedreview = await Review.findById(req.params.id);

  res.status(200).send({ status: "success", data: updatedreview });
});

const updateRating = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    throw createError(404, `Review is not found with id of ${req.params.id}`);

  //check if review belongs to user created or user is admin

  const findReview = await Review.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!findReview && req.user.role !== "admin")
    throw createError(400, "Not authorized to update this review");

  review.rating = req.body.newRating;

  await review.save();

  const updatedreview = await Review.findById(req.params.id);

  res.status(200).send({ status: "success", data: updatedreview });
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    throw createError(404, `Review is not found with id of ${req.params.id}`);

  //check if review belongs to user created or user is admin
  const findReview = await Review.findOne({
    _id: req.params.id,
    userId: req.user._id,
  });

  if (!findReview && req.user.role !== "admin")
    throw createError(400, "Not authorized to update this review");

  await review.remove();

  res
    .status(204)
    .send({ status: "success", message: "Review Deleted Successfully" });
});

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  updateRating,
};