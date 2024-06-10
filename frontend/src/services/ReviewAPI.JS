
import { getToken } from "./helper";
import axios from 'axios';

// ADD REVIEW
export const addReview = async (fileId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await axios.post(`http://localhost:5000/api/review/add/${fileId}`, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.log("Error in Add Review Method" + error.message);
  }
};

// GET REVIEW BY MOVIE
export const getReviewsByFile = async (fileId) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/review/get-reviews-by-file/${fileId}`);

    return data;
  } catch (error) {
    console.log("Error in Get Review for Movie" + error.message);
  }
};

// DELETE REVIEW
export const deleteReview = async (reviewId) => {
  const token = getToken();
  try {
    const { data } = await axios.delete(`http://localhost:5000/api/review/${reviewId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log("Error in Delete Review" + error.message);
  }
};

// EDIT REVIEW
export const editReview = async (reviewId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await axios.patch(`http://localhost:5000/api/review/${reviewId}`, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    return data;
  } catch (error) {
    console.log("Error in Get Edit Review for Movie" + error.message);
  }
};