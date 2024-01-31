import React from "react";
import Profile from "./Profile/Profile";
import "./RightSide.css";
import { Link } from "react-router-dom";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        
       <Link to="/profile"> <Profile /></Link>
      </div>
      
    </div>
  );
};

export default RightSide;
