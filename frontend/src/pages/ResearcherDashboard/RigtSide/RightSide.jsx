import React from "react";
import "./RightSide.css";
import ResearcherProfile from "../Profile/Profile";
import { Link } from "react-router-dom";
const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
      <Link to="/profile"> <ResearcherProfile /></Link>
    </div>
    </div>
  );
};

export default RightSide;
