import React from 'react';
import { Link } from 'react-router-dom';
import '../Researcher/Researcher.css';

import researcher from '../Researcher/research.jpg';
const Resercheer = () => {
  return (
    <div className="researcher">
      <div className="image">
        <img src={researcher} alt="researcher-img" />
      </div>
      <div className="text">
        <h1>RESEARCHERS</h1>
        <h3>Join now to start your journey.*</h3>
        <h4>
          The free-market economy of Sri Lanka was worth $84 billion by nominal
          gross domestic product (GDP) in 2019 and $296.959 billion by
          purchasing power parity (PPP).
        </h4>
        <div className="cta">
          <Link to="/welcome">Join now</Link>
        </div>
      </div>
    </div>
  );
};

export default Resercheer;
