import React, { useEffect, useState } from 'react';
import { Comregister } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate} from 'react-router-dom';
import './Registration.css';
import { Link } from '@mui/material';
import ErrorMessage from "../../ErrorMessage";
import ValidationError from './ValidationError';

function CompanyRegister() {
    const [company_name, setCompanyName] = useState("");
    const [industry, setIndustry] = useState("");
    const [business_regNo, setBusinessRegNo] = useState("");
    const [scale, setScale] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [time_zone, setTimezone] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    
    const companyRegiser = useSelector((state) => state.companyRegiser);
    const { loading, error, userInfo } = companyRegiser;

    const navigate= useNavigate();

    const postDetails = (pics) => {
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "Research");
          data.append("cloud_name", "ddmpcispc");
          fetch("https://api.cloudinary.com/v1_1/ddmpcispc/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setPic(data.url.toString());
              console.log(pic);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return setPicMessage("Please Select an Image");
        }
      };    

    
         /* useEffect(() => {
            if (userInfo) {
              navigate("/Companylogin");
            }
          }, [navigate, userInfo]);  */
        
          function submitHandler(e){
            e.preventDefault();
        
            if (password !== confirmpassword) {
              setMessage("Passwords do not match");
            }else dispatch(Comregister(company_name,industry,business_regNo,scale,address,state,country,time_zone,contact,email,username,password,pic)
     ).then(() => {
        setMessage("Registration successful. An email has been sent to your account for verification.");
      })
      .catch((error) => {
        // Handle any errors that occur during the registration process
        setMessage(error.message);
      });  }
    return (
        <div className='bggray'>
            <div className='my-3 py-5'>
                <h2 className='text-center font-h2'>Company Profile Registration Form</h2>
                <h5 className='text-center font-h2'>Page 1</h5>
                <div class="container cform">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                    <div className='mb-5' style={{ marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                        <div className='border-left border-top border-success shadow rounded-3 bg-light'>
                            <form onSubmit={submitHandler} className='px-1 mx-3 mt-5 mb-5'>
                            <h2 className='text-center mb-4 font-form-head-2'>Company Informations</h2>
                                <div class="form-group" >
                                    <h6 className="form-font" htmlFor="company_name">Company Name</h6>
                                    <input type="company_name" class="form-control" aria-describedby="emailHelp" placeholder="Enter Company Name" name="company_name" value={company_name} onChange={(e) => setCompanyName(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="industry">Industry</h6>
                                    <input type="industry" class="form-control" placeholder="Enter the Industry" name="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="business_regNo">Business Registration No</h6>
                                    <input type="business_regNo" class="form-control" placeholder="Enter Surname"  name="business_regNo" value={business_regNo} onChange={(e) => setBusinessRegNo(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="scale">Organization Scale</h6>
                                    <select value={scale}  name='scale' onChange={(e) => setScale(e.target.value)} class="form-control organization-scale">
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="address">Company Address</h6>
                                    <input type="address" class="form-control" aria-describedby="emailHelp" placeholder="Enter Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="state">State / City</h6>
                                    <input type="state" class="form-control" placeholder="Enter City" name='state' value={state} onChange={(e) => setState(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="country">Country</h6>
                                    <input type="country" class="form-control" placeholder="Enter Country" name='country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="time_zone">Time Zone</h6>
                                    <input type="time_zone" class="form-control" placeholder="Enter Time Zone" name='time_zone' value={time_zone} onChange={(e) => setTimezone(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="contact">Phone Number</h6>
                                    <input type="contact" class="form-control" placeholder="Enter Phone Number" name='contact' value={contact} onChange={(e) => setContact(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="email">Email Address</h6>
                                    <input type="email" class="form-control" placeholder="Enter Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="username">Create an User Name </h6>
                                    <input type="username" class="form-control" aria-describedby="emailHelp" placeholder="User Name" name='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="password">Create a Password</h6>
                                    <input type="password" class="form-control" placeholder="Password"  name='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="confirmpassword">Confirm the Password</h6>
                                    <input type="password" class="form-control" placeholder="Confirm Password" name='confirmpassword' value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                </div>
                               
                                <div align="center">
                                    <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button">Register</button>
                                </div>
                                {ErrorMessage === "Success" ? <Link to="/Companylogin"/>: <ValidationError message={ErrorMessage} />}

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )

}

export default CompanyRegister;