import React from 'react';
import { passwordresetCom } from '../../actions/userActions';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './NewPassword.css';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage';

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { token } = useParams();
  
  const dispatch = useDispatch();

  

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  //const { error, userInfo } = userForgotPassword || {};
  const { loading, error, userInfo } = userForgotPassword;
  
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
  //    navigate("/");
    }
  }, [userInfo, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordresetCom(password,token));
  };

  return (
    <div className="reset-container">
      <div className="reset-password">
        <h1>Enter your New password</h1>
        {error && <div className="msg">{error.message}</div>}
      {userInfo && <div className="msg">{userInfo.message}</div>} 
   {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>} */}
        <form onSubmit={onSubmit} className="form">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Password"  value={password}
            onChange={(e) => setPassword(e.target.value)}
            required/>
            {error && error.password && <div>{error.password}</div>}
        <button type='submit'>SUBMIT</button>
      
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
