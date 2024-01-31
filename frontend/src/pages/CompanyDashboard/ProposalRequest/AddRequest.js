import React, { useState,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddRequest=()=>{
    const userLoginCom = useSelector((state) => state.userLoginCom);
    const { userInfo } = userLoginCom;



    const navigate= useNavigate();
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id
    const [inputs, setInputs] = useState({
        title: "",
        text: "",
        deadline: "",
      });

      const onChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const { data } = await axios.post("/api/request/add/", {
            title: inputs.title,
            text: inputs.text,
            deadline: inputs.deadline,
            user: id,
          });if (data?.success) {
            navigate("/companydashboard");
          } 
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <Fragment>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center m-3">Proposal Request</h2>
                    <div className="form-row d-flex justify-content-center">
                        <div className="col-3 m-1">
                            <input name = "title" type="text" value={inputs.title}
                                className="form-control" placeholder="title" required
                                onChange={(e) => onChange(e)} />
                        </div>
                        <div className="col-3 d-flex justify-content-center m-1">
                            <input type="text" className="form-control" required
                                name = "text" placeholder="Description" value={inputs.text}
                                onChange={(e) => onChange(e)}/>
                        </div>
                        <div className="col-3 d-flex justify-content-center m-1">
                            <input type="date" className="form-control" 
                                name = "deadline" placeholder="Deadline" value={inputs.deadline} required
                                onChange={(e) => onChange(e)}/>
                        </div>
                        
                        <button className='btn btn-primary col-1 d-flex justify-content-center m-1' 
                            type='submit'>Add</button>
                    </div>
                </form>
        </Fragment>
    )
}

export default AddRequest;