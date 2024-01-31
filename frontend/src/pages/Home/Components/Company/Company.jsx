import React from 'react';
import { Link } from 'react-router-dom';
import '../Company/Company.css';

import company from '../Company/company.jpg';
const Company = () => {
  return (
    <div className="company left-right-section">
      <div className="text">
        <h1>COMPANY OR INSTITUTE ?</h1>
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
        <img src={company} alt="company-imag" />
      </div>
    </div>
  );
};

export default Company;
