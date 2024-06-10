import React from "react";
import CustomButtonLink from "./CustomButtonLink";
import Container from "./container";
import RatingStar from "./RatingStar";
import { useDispatch, useSelector } from "react-redux";
import AddRatingModal from "./AddRating";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteReview, getReviewsByFile } from "./ReviewApi";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "./ConfirmModal";
import NotFoundText from "./NotFoundText";
import EditRatingModal from "./EditRating";


const MovieReviews = () => {
  const [movie, setMovie] = useState({});
  const [movieReviews, setMovieReviews] = useState([]);
  const [profileOwners, setProfileOwners] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [movieTitle, setMovieTitle] = useState(" ");
  const [showRatingModal, setShowRatingModal] = useState(false);
 
  const { fileId } = useParams();
 /*  const { authInfo } = useAuth(); */
 

  const fetchReviews = async () => {
    const { movie, error } = await getReviewsByFile(fileId);
    if (error) return toast.error(error + "Error Fetching Reviews by Movie!");
    setMovieReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };



  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  // Delete Review
  const handleDeleteReviews = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwners.id);
    setBusy(false);
    if (error) return toast.error(error + " Error Deleting Review");
    toast.success(message);

    const updatedReviews = movieReviews.filter(
      (r) => r.id !== profileOwners.id
    );
    setMovieReviews([...updatedReviews]);
    setProfileOwners(null);
    setShowConfirmModal(false);
  };

  const handleOnEdit = () => {
    const { id, title,text, rating } = profileOwners;
    setSelectedReview({
      id,
      title,
      text,
      rating,
    });
    setShowEditModal(true);
  };

  // Update Reviews
  const handleReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwners,
      rating: review.rating,
      text: review.text,
      title: review.title,
    };
    setProfileOwners({ ...updatedReview });

    const newReviews = movieReviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setMovieReviews([...newReviews]);
  };
  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews });
  };

  useEffect(() => {
    if (fileId) fetchReviews();
  }, [fileId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-secondary dark:text-white">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews For:{" "}
            </span>
            {movieTitle}
          </h1>
        </div>

        <NotFoundText text="No Reviews!" visible={!movieReviews.length} />

        {profileOwners ? (
          <div className="mt-3">
            <ReviewCard review={profileOwners} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEdit} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {movieReviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        )}
      </Container>

      <ConfirmModal
        busy={busy}
        visible={showConfirmModal}
        onConfirm={handleDeleteReviews}
        onCancel={() => setShowConfirmModal(false)}
      />

      <EditRatingModal
        visible={showEditModal}
        onSuccess={handleReviewUpdate}
        onClose={hideEditModal}
        initialState={selectedReview}
      />
       <AddRatingModal
        onSuccess={handleOnRatingSuccess}
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />
    </div>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { title,text,rating } = review;
  return (
    <div className="flex space-x-3">
      
      <div className="">
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{title}</p>
        <p className="text-light-subtle dark:text-dark-subtle">{text}</p>
      </div>
    </div>
  );
};

export default MovieReviews;