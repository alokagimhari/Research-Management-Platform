import React, { useState,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import RightSide from "../RigtSide/RightSide";
import { useDispatch } from "react-redux";
import { addFirstMessage } from "../../../actions/userActions";
const AddMessage = () => {
    const userLoginRes = useSelector((state) => state.userLoginRes);
    const { userInfo } = userLoginRes;

    const dispatch = useDispatch();
    const { _id, title } = useParams();
    console.log(_id);

    const navigate= useNavigate();
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id
    const [inputs, setInputs] = useState({
        body: "",
      });

     const onChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

     /*const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const { data } = await axios.post("/message/addResearcherMessage", {
            title: title,
            body: inputs.body,
            Researcher: id,
            Company:_id
          })
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
 */

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.body) {
          alert("Please fill in all the fields");
          return;
        }
      
        try {
          const { data } = await axios.post("http://localhost:5000/message/addResearcherMessage", {
            title: title,
            body: inputs.body,
            researcherId: id,
            companyId: _id,
            isSenderCompany:false,
            isSenderResearcher:true
          });
          console.log(data);
          // Optionally, show a success message to the user after a successful submission
          alert("Message added successfully!");
          // Optionally, redirect the user to another page after successful submission
          dispatch(addFirstMessage(data));
        } catch (error) {
          console.log(error);
          // Display an error message to the user if the request fails
          alert("Error adding the message. Please try again.");
        }
      };
      return (
        <div className="App">
		<div className="AppGlass">
		<Sidebar />
        <div>
        <h2 className="text-center m-3">Drop a message</h2>
                <form onSubmit={handleSubmit}>
                    
                    <h3>{title}</h3>
                    <div className="form-row d-flex justify-content-center">
                       
                        <div className="col-3 d-flex justify-content-center m-1">
                            <input type="text" className="form-control" required
                                name = "body" placeholder="Description" value={inputs.body}
                                onChange={(e) => onChange(e)}/>
                        </div>
                       
                        
                        <button className='btn btn-primary col-1 d-flex justify-content-center m-1' 
                            type='submit'>Add</button>
                    </div>
                </form>
        </div>
        <RightSide/>
       </div>
       </div>
    )
}

export default AddMessage;