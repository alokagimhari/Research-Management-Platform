import React from 'react';

import '../Showcase/Showcase.css';

const Showcase = () => {
  return (
    <div className="showcase ">
      <h2>Welcome</h2>
      <h1>Ideas Reserch Management Platform</h1>
      <p>
        The free-market economy of Sri Lanka was worth $84 billion by nominal
        gross domestic product (GDP) in 2019 and $296.959 billion by purchasing
        power parity (PPP).
      </p>
      <div className="showcase-buttons">
        <button className="button-1">About</button>
        {/* <button className="button-2">Accounts</button> */}
      </div>
    </div>
  );
};

export default Showcase;
