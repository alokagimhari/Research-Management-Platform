import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import Profile from "../Profile/Profile";
import "./RightSide.css";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
       <Profile/>
      </div>
    </div>
  );
};

export default RightSide;
