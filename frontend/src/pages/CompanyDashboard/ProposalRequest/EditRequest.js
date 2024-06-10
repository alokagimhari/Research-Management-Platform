import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import RightSide from "../Rightside/RightSide";
const EditRequest = () => {
    const [request, setrequest] = useState({});
    const {_id} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    console.log(_id);
    const userLoginCom = useSelector((state) => state.userLoginCom);
    const { userInfo } = userLoginCom;
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id
    // get request details
    const getrequestDetail = async () => {
      try {
        const { data } = await axios.get(`/api/request/getRequest/${_id}`);
        console.log(data);
        if (data?.success) {
          setrequest(data?.request);
          setInputs({
            title: data?.request.title,
            text: data?.request.text,
            deadline: data?.request.deadine,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getrequestDetail();
    }, [_id]);
  
    // input change
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    //form
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.patch(`/api/request/update/${_id}`, {
          title: inputs.title,
          text: inputs.text,
          deadline: inputs.deadine,
          user: id,
        });
        if (data?.success) {
          navigate("/requestTable");
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log(request);

    return (
      <div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">

			<form onSubmit={handleSubmit}>
				<h1>Edit</h1>
				<div className="form-group">
					<label>Title</label>
					<input
						name="title"
						type="text"
						value={inputs.title}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Text</label>
					<input
						name="text"
						type="text"
						value={inputs.text}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Deadline</label>
					<input
						name="deadline"
						type="date"
						value={inputs.deadline}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
			
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					{/* <button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button> */}
				</div>
			</form>
		</div>
    <RightSide/>
    </div>
    </div>

	);
}
export default EditRequest;