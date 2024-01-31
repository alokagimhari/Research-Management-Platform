import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addReview } from "./ReviewApi";
import RatingForm from "./RatingForm";
import ModalContainer from "./ModalContainer";

const AddRatingModal = ({ visible, onClose, onSuccess }) => {
  const { fileId } = useParams();

  const handleSubmit = async (data) => {
    const { error, message, reviews } = await addReview(fileId, data);
    if (error) return toast.error(error);

    toast.success(message);
    onSuccess(reviews);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
};

export default AddRatingModal;