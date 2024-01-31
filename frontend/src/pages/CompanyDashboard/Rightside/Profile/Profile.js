import React,{ useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../../../actions/userActions";
import { useNavigate} from 'react-router-dom';
import moment from 'moment';

function Profile(){

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompanyName] = useState("");

  
  const dispatch = useDispatch();

  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;

   const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  console.log(userUpdateProfile);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
    navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (userInfo.data) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userInfo.data]);

  const onSubmit = () => {
    dispatch(updateUserProfile(username, email, company_name));
  };
 
    const [usenumber,setusenumber] = useState(1);
    
    const [fullimage,setfullimage]=useState(true);
  
    const [isActive,setisActive] = useState(false);
    
    const [heart,setheart]=useState(true);
    
    const ImageClick = () =>{
    
    if(isActive){
    
    setisActive(false);
    }else{
    setisActive(true);
    }
    
    
    }
    const FullImage=()=>{
    if(fullimage){
    setfullimage(false);
    }
    else{
    setfullimage(true);
    }
    }
    
    const Message=()=>{
    setusenumber(usenumber+1);
    }
    
    const Heart=()=>{
    if(heart){
    setheart(false);
    }
    else{
    setheart(true);
    }
    }
    
    
    return(
    <div className="container">
        <div className="container-profile">

            <div className={`card ${isActive ? "black" : "" }`}>
                        <div className={`top_part ${isActive ? "font_icons" : "" }`}>
                            <i className="fa fa-arrow-left"></i>
                            
                            <div className="icons">
                                <i onClick={ImageClick} className="fa fa-moon-o"></i>
                                <i onClick={Heart} className={`fa ${heart ? "fa-heart-o" : "fa-heart" }`}></i>
                                <i className="fa fa-ellipsis-v"></i>
                            </div>
                        </div>
                      <div className={`overlay ${fullimage ? "d-none" : "" }`}>
                          <small onClick={FullImage} className="fa fa-close"></small>
                          <img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" />
                      </div>
                    <div className="circle">
                        <span onClick={FullImage}><img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" /></span>
                        
                    </div>
                    <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={userInfo.data.username}
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            required
          />
          {error && error.username && (
            <div className="validatemsg">{error.username}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userInfo.data.email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
          />
          {error && error.email && (
            <div className="validatemsg">{error.email}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="company_name">Company Name</label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            placeholder="company_name"
            value={userInfo.data.company_name}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          {error && error.company_name && (
            <div className="validatemsg">{error.company_name}</div>
          )}
        </div>
       {/*  <button type="submit" >
          Update {loading && <Loader />}
        </button> */}
      </form>
                           
            </div>
        </div>
    
        </div>
    );
  }

    export default Profile;