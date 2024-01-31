import React,{ useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { Form} from "react-bootstrap";
import { useNavigate,useParams} from "react-router-dom";

function Details(){


   
  const profile = JSON.parse(localStorage.getItem("userInfo"));
 
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
        <h1>{profile.company_name}</h1>
      <h1>{profile.email}</h1>
                            <div className="button">
                                <button onClick={Message}>Message </button>
                            </div>
                            <div className="social">
                                <i className="fa fa-twitter"></i>
                                <i className="fa fa-linkedin"></i>
                                <i className="fa fa-whatsapp"></i>
                            </div>
            </div>
        </div>
    
        </div>
    );
  }

    export default Details;