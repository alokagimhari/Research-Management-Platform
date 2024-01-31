import React from 'react';
import { Link } from 'react-router-dom';
import '../About/About.css';

import illustrar from '../About/digital-illustrar.jpg';
const About = () => {
  return (
    <div className="about left-right-section">
      <div className="text">
        <h1>RESEARCH MANAGEMENT</h1>
        <h1>PLATFORM</h1>
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
      <div className="image">
        <img src={illustrar} alt="starbucks-star" />
      </div>
    </div>
  );
};

export default About;
