import React from 'react';
import { forgotPasswordRes } from '../../actions/userActions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Reset.css';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';

const Reset = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  //const { error, userInfo } = userForgotPassword || {};
  const { loading, error, userInfo } = userForgotPassword;
  const navigate=useNavigate();  
  
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
/*  navigate("/passwordreset/:token"); */
    }
  }, [userInfo, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRes(username));
  };

  return (
    <div className="reset-container">
      <div className="reset-password">
        <h1>Reset your password</h1>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {userInfo && <div className="msg">{userInfo.message}</div>}
        <form onSubmit={onSubmit} className="form">
        <h6>
          To receive a link to reset your password, please enter your email
          address.
        </h6>
        <label htmlFor="username">UserName</label>
        <input type="email" id="username" placeholder="example@gmail.com"  value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
            {error && error.user && <div>{error.user}</div>}
        <button>Reset Password</button>
      
        </form>
      </div>
    </div>
  );
};

export default Reset;
