import React,{ useState, useEffect} from "react";
import "./Profile.css";
import axios from "axios";
import { Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import { getResearcherDetails, updateUserProfile } from "../../../actions/userActions";
function ResearcherProfile(){

  /* const initialState = {
  first_name:"",
last_name:"",
industry:"",
linkedIn:"",

  }

  const [form, setForm] = useState({initialState});
 
  const { _id} = useParams();
	const navigate = useNavigate();

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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name,setFirstName]=useState("");

  const dispatch = useDispatch();

  const userLoginRes = useSelector((state) => state.userLoginRes);
  const { userInfo } = userLoginRes;

   /* const userResearcher = useSelector((state) => state.userResearcher);
    const { loading, error, user } = userResearcher;
*/
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
      dispatch(getResearcherDetails());
    }
  }, [dispatch, userInfo.data]);

  const onSubmit = () => {
    dispatch(updateUserProfile(username, email));
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
          {/* {error && error.username && (
            <div className="validatemsg">{error.username}</div>
          )} */}
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
         {/*  {error && error.email && (
            <div className="validatemsg">{error.email}</div>
          )} */}
        </div>
        <div className="field">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First name"
            value={userInfo.data.first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {/* {error && error.first_name && (
            <div className="validatemsg">{error.first_name}</div>
          )} */}
        </div>
       {/*  <button type="submit" >
          Update {loading && <Loader />}
        </button> */}
      </form>
                {/* <div className="button">
                    <button onClick={Message}>Message </button>
                </div> */}
                
            </div>
    
        </div>
    
    </>
    )};

    export default ResearcherProfile;