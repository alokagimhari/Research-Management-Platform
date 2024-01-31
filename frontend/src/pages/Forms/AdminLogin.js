import React, { useEffect, useRef, useState } from 'react';
import { ReactDOM } from 'react';
import { loginAdmin } from "../../actions/userActions";
import { useSelector,useDispatch } from "react-redux";
import './Welcomelogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const userAdmin  = useSelector((state) => state.userAdmin );
  const { loading, error, userInfo } = userAdmin ;
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    if (userInfo) {
 navigate(`/adminDashboard`);
    }
  }, [navigate, userInfo]);

  const submitHandler  = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(username, password));
  };
   /*  async function submit(e){
        e.preventDefault();

        try{
            await axios.post('http://localhost:5000/admin',{
                username,password
            }).then(res=>{
                if(res.data==="exist"){
                    history("/adminDashboard")
                }
                else if(res.data==="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })
        }catch(e)
        {
            console.log(e);
        }
    } */
return(
   /*  <div className='bggray'>
        <div className='my-3 py-5'>
            <h2 className='text-center font-h2'>Admin Login</h2>

            <div class="container cform">
                <div className='mb-5' style={{ marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                    <div className='border-left border-top border-success shadow rounded-3 bg-light'>
                        <form className='px-1 mx-3 mt-5 mb-5' action='POST'>
                            <div class="form-group">
                                <label for="exampleInputEmail1">User Name</label>
                                <input type="text" class="form-control" aria-describedby="emailHelp" onChange={(e)=>{setUsername(e.target.value)}} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="text" class="form-control"  onChange={(e)=>{setPassword(e.target.value)}} />
                            </div>
                            <div align="center">
                                <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button" onClick={submit}>Sign in</button>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>


 */
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
           
    </form>
)

}
