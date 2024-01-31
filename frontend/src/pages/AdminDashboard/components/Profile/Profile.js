import React,{ useState, useEffect} from "react";
import "./Profile.css";
import axios from "axios";
import { Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function ResearcherProfile(props){

  const initialState = {
  first_name:"",
last_name:"",
industry:"",
linkedIn:"",

  }

  const [form, setForm] = useState({initialState});
 
  const { _id} = useParams();
	const navigate = useNavigate();
/* 
  useEffect(
		function () {
			async function updateForm() {
				try {
					const response = await axios.get(`http://localhost:5000/getResearcherRecord/${_id}`);
					setForm(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateForm();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateForm() {
			try {
				await axios.put(`http://localhost:5000/updateResearcher/${form._id}`, form);
			navigate(`/getResearcherRecord/${form._id}`);
			} catch (error) {
				console.log(error);
			}
		}
		updateForm();
	}

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

function handleCancel() {
		navigate(`/getResearcherRecord/${form._id}`);
	}  */
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
    <>
        <div className="container">
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
                    <img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt=""/>
                </div>
                <div className="circle">
                    <span onClick={FullImage}><img src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png" alt=""/></span>
                    </div>  
                    <Form /* onSubmit={handleSubmit} */>   
          <div className="form-group">
         <label htmlFor="first_name"> Email: </label>
         <h6>admin@gmail.com</h6>
        {/*  <input
           type="text"
           className="form-control"
           name="first_name"
           
          value={form.first_name} 
           onChange={handleChange}
         /> */}
         <label htmlFor="first_name"> Password: </label>
         <h6>admin</h6>
       </div>
      {/*  <div className="form-group">
         <label htmlFor="last_name">Last Name: </label>
         <input
           type="text"
           className="form-control"
           name="last_name"
           value={form.last_name}
           onChange={handleChange}
         />
       </div>
       <div className="form-group">
         <label htmlFor="industry">Industry: </label>
         <input
           type="text"
           className="form-control"
           name="industry"
           value={form.industry}
						onChange={handleChange}
         />
       </div>
       <div className="form-group">
         <label htmlFor="linkedIn">LinkedIn: </label>
         <input
           type="text"
           className="form-control"
           name="linkedIn"
           value={form.linkedIn}
						onChange={handleChange}
         />
       </div> 

<div className="form-group">
<button type="submit" className="btn btn-primary">
						Update
					</button>
          <button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
       </div> */}
            </Form>
                
                
            </div>
    
        </div>
    
    </>
    )};

    export default ResearcherProfile;