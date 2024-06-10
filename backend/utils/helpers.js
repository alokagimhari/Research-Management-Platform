const Review = require("../models/Review");
// AGGREGATION FOR AVERAGE RATINGS
exports.averageRatingPipeline = (fileId) => {
  return [
    {
      $lookup: {
        from: "Review",
        localField: "rating",
        foreignField: "_id",
        as: "avgRat",
      },
    },
    {
      $match: {
        product: fileId,
      },
    },
    {
      $group: {
        _id: null,
        ratingAvg: {
          $avg: "$rating",
        },
        reviewCount: {
          $sum: 1,
        },
      },
    },
  ];
};

exports.getAverageRatings = async (fileId) => {
    const [aggregatedRes] = await Review.aggregate(
      this.averageRatingPipeline(fileId)
    );
    const reviews = {};
  
    if (aggregatedRes) {
      const { ratingAvg, reviewCount } = aggregatedRes;
      reviews.ratingAvg = parseFloat(ratingAvg).toFixed(1);
      reviews.reviewsCount = reviewCount;
    }
    return reviews;
  };
  