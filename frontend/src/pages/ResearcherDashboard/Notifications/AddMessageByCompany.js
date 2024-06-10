import React, { useState,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const AddMessage = () => {
    const userLoginRes = useSelector((state) => state.userLoginRes);
    const { userInfo } = userLoginRes;

    const _id=useParams();
  console.log(_id);

    const navigate= useNavigate();
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id
    const [inputs, setInputs] = useState({
        title: "",
        body: "",
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
           const { data } = await axios.post("/message/addCompanyMessage", {
            title: inputs.title,
            body: inputs.body,
            Researcher: id,
            Company:_id
          })
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <div>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center m-3">Drop a message</h2>
                    <div className="form-row d-flex justify-content-center">
                        <div className="col-3 m-1">
                            <input name = "title" type="text" value={inputs.title}
                                className="form-control" placeholder="title" required
                                onChange={(e) => onChange(e)} />
                        </div>
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
    )
}

export default AddMessage;