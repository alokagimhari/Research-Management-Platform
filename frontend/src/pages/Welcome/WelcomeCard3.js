import React from 'react';

import './Welcome.css';

const WelcomeCard2 = (props) => {
    return (
      <div className="cards">
        <div className="card-img">
          <img src={props.imgsrc} alt="compnay" className="card-img-top" />
        </div>
        <div className="card-body">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <div className="card-footer">
          <div>
            <a className="welcome-login-button" href='/admin'>Login</a>
            </div>
          <div>
            </div>
        </div>
      </div>
    );
  };

  export default WelcomeCard2