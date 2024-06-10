import React from 'react';

import '../Footer/Footer.css';

const Footer = () => {
  return (
    <div className="footer footer-container">
      <div className="link-container link-container-01">
        <h3>About Us</h3>
        <ul>
          <li>Our Heritage</li>
          <li>Our Cofee</li>
          <li>Stories and News</li>
          <li>Investor Relations</li>
          <li>Policies and Standards</li>
          <li>Customer Service</li>
        </ul>
      </div>
      <div className="link-container link-container-02">
        <h3>Careers</h3>
        <ul>
          <li>Culture and Values</li>
          <li>Inclusion, Diversity, and Equity</li>
          <li>College Achievement Plan</li>
          <li>U.S. Careers</li>
          <li>International Careers</li>
        </ul>
      </div>
      <div className="link-container link-container-03">
        <h3>Social Impact</h3>
        <ul>
          <li>Ethical Sourcing</li>
          <li>Leading and Sustainability</li>
          <li>Strengthening Communities</li>
          <li>Creating Opportunities</li>
          <li>Global Social Impact Report</li>
        </ul>
      </div>
      <div className="link-container link-container-04">
        <h3>For Busness Partners</h3>
        <ul>
          <li>Landlord Support Center</li>
          <li>Suppliers</li>
          <li>Corporate Gift Card Sales</li>
          <li>Office and Foodservice Cofee</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
