import React from 'react';

import './LoginWithCode.css';

const LoginWithCode = () => {
  return (
    <div className="login-with-code-container">
      <div className="login-with-code">
        <h1>Enter Access Code</h1>
        <h6>Check your email to login access code.</h6>
        <label htmlFor="">Verification Code</label>
        <input type="email" placeholder="XXXX" />
        <button>Verify</button>
        <a href="/accsescode">Resend Code</a>
      </div>
    </div>
  );
};

export default LoginWithCode;
