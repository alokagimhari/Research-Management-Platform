import React, { useEffect, useState } from 'react';
import { Resregister } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate} from 'react-router-dom';
import './Registration.css'
import ErrorMessage from "../../ErrorMessage";
import ValidationError from './ValidationError';
import { Link } from '@mui/material';

function ResearcherRegister(){
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("");
    const [birthDay, setBirthday] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [time_zone, setTimezone] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [industry, setIndustry] = useState("");
    const [institute, setInstitute] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [researchGate, setResearchGate] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);

    const dispatch = useDispatch();

    
    const ResearcherRegister = useSelector((state) => state.ResearcherRegister);
    const { loading, error, userInfo } = ResearcherRegister;

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

    
       /*  useEffect(() => {
            if (userInfo) {
              navigate("/Researcherlogin");
            }
          }, [navigate, userInfo]); */
        
          function submitHandler(e){
            e.preventDefault();
        
            if (password !== confirmpassword) {
              setMessage("Passwords do not match");
            }else dispatch(Resregister(first_name,last_name,surname,gender,birthDay,
                address,
                state,
                country,
                time_zone,
                contact,
                industry,
                institute,
                linkedIn,
                researchGate,
                email,
                username,
                password,
                pic)
     )   
     .then(() => {
        setMessage("Registration successful. An email has been sent to your account for verification.");
      })
      .catch((error) => {
        // Handle any errors that occur during the registration process
        setMessage(error.message);
      });
    }
    return (
        <div className='bggray'>
            <div className='my-3 py-5'>
                <h2 className='text-center font-h2'>Researcher Profile Registration Form</h2>
                <h5 className='text-center font-h2'>Page 1</h5>
                <div class="container cform">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                    <div className='mb-5' style={{ marginLeft: '0%', marginRight: '0%', marginTop: '5%' }}>
                        <div className='border-left border-top border-success shadow rounded-3 bg-light'>
                            <form onSubmit={submitHandler} className='px-1 mx-3 mt-5 mb-5'>
                                <h2 className='text-center mb-4 font-form-head-2'>Personal Informations</h2>
                                <div class="form-group">
                                    <h6 className="form-font" htmlFor="first_name">First Name</h6>
                                    <input type="first_name" class="form-control" aria-describedby="emailHelp" placeholder="Enter First Name" name="company_name" value={first_name} onChange={(e) => setFirstName(e.target.value)}required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Last Name</h6>
                                    <input type="text" class="form-control" placeholder="Enter Last Name" name="last_name" value={last_name} onChange={(e) => setLastName(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Surname</h6>
                                    <input type="text" class="form-control" placeholder="Enter Surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Gender</h6>
                                    <select id="Gender" input type="select" class="form-control" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <h6 className="exampleInputEmail1 form-font dob">Date of Birth</h6>
                                    <input type="date" class="form-control" name="birthday" value={birthDay} onChange={(e) => setBirthday(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Permanent Address</h6>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">State / City</h6>
                                    <input type="text" class="form-control" placeholder="Enter City" name="state" value={state} onChange={(e) => setState(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Country</h6>
                                    <input type="text" class="form-control" placeholder="Enter Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Time Zone</h6>
                                    <input type="text" class="form-control" placeholder="Enter Time Zone" name="time_zone" value={time_zone} onChange={(e) => setTimezone(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Phone Number</h6>
                                    <input type="text" class="form-control" placeholder="Enter Phone Number" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Email Address</h6>
                                    <input type="email" class="form-control" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Research Industry</h6>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" name="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">University/ Institute</h6>
                                    <input type="text" class="form-control" name="institute" value={institute} onChange={(e) => setInstitute(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">LinkedIn Url</h6>
                                    <input type="url" class="form-control" name="linkedIn" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">ResearchGate Url</h6>
                                    <input type="url" class="form-control" name="researchGate" value={researchGate} onChange={(e) => setResearchGate(e.target.value)} />
                                </div>
                                
                                <div class="form-group">
                                    <h6 className="form-font">Create an User Name</h6>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Create a Password</h6>
                                    <input type="password" class="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                </div>
                                <div class="form-group">
                                    <h6 className="form-font">Confirm the Password</h6>
                                    <input type="password" class="form-control" placeholder="Confirm Password"  value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                                </div>
                                <div align="center">
                                    <button type="submit" class="btn btn-primary mt-2 mb-4 form-signin-button">Register</button>
                                </div>
                                {ErrorMessage === "Success" ? <Link to="/Researcherlogin"/>: <ValidationError message={ErrorMessage} />}
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )

}
export default ResearcherRegister;