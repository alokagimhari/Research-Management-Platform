import React, { useState, useEffect } from "react";//import { useLogin } from "../hooks/useLogin"
import { useDispatch, useSelector } from "react-redux";
import { loginRes } from "../../actions/userActions";
import { useNavigate} from 'react-router-dom';
import ErrorMessage from "../../ErrorMessage";
import ValidationError from '../Registration/ValidationError';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import './Login.css';

function ResLogin () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const {login, error, isLoading} = useLogin()
  const [message, setMessage] = useState(null);
 
  const userLoginRes = useSelector((state) => state.userLoginRes);
  const { loading, error, userInfo } = userLoginRes;
  
  const navigate = useNavigate();
  useEffect(() => {
    if ( userInfo) {
navigate('/researcherdashboard')
    }
  }, [userInfo,navigate]);

  const dispatch = useDispatch();
  function submitHandler(e){
    e.preventDefault();
    dispatch(loginRes(username, password));
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      <h3>Log In</h3>

      <div class="form-group">
      <label>Email address:</label>
      <input
        type="email"
        value={username}
        placeholder="Enter email"
        onChange={(e) => setUsername(e.target.value)}
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      </div>
      <div class="form-group">
      <label>Password:</label>
      <input
         type="password"
         id="password"
         value={password}
         placeholder="Password"
         onChange={(e) => setPassword(e.target.value)}
         name="password"
         label="Password"
      />
  </div>

<div align="center">
      <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button" >Login{loading}</button>
</div>
     
      <Grid container>
              <Grid item xs>
                <Link href="/ResearcherforgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/ResearcherRegister" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            
    </form>
  );
};

export default ResLogin;
