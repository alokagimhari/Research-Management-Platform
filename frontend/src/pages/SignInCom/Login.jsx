import React, { useState, useEffect } from "react";//import { useLogin } from "../hooks/useLogin"
import { useDispatch, useSelector } from "react-redux";
import { loginCom } from "../../actions/userActions";
import { useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import './Login.css';

function ComLogin () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
  //const {login, error, isLoading} = useLogin()
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const navigate = useNavigate ()
  
  const userLoginCom  = useSelector((state) => state.userLoginCom );
  const { loading, error, userInfo } = userLoginCom ;


  useEffect(() => {
    if (userInfo) {
 navigate(`/companydashboard`);
    }
  }, [navigate, userInfo]);

  const submitHandler  = (e) => {
    e.preventDefault();
    dispatch(loginCom(username, password));
  };

  return (
    <form className="login" onSubmit={submitHandler}>
      {error && <h1 varient="danger">{error}</h1>}
      <h3>Log In</h3>

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
      <label>Password:</label>
      <input
         type="password"
         id="password"
         value={password}
         placeholder="Password"
         onChange={(e) => setPassword(e.target.value)}
         name="password"
         label="Password"
         autoComplete="password"
      />


      <div align="center">
      <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button" >Login{loading}</button>
</div>
        <Grid container>
              <Grid item xs>
                <Link href="/CompanyforgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/CompanyRegister" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
           
    </form>
  );
};

export default ComLogin;
