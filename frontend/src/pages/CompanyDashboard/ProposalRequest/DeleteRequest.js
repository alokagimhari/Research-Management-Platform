import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const EditRequest = () => {
    const [request, setrequest] = useState({});
    const {_id} = useParams();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    
    console.log(_id);
    
    // get request details
    const getrequestDetail = async () => {
      try {
        const { data } = await axios.get(`/api/request/getRequest/${_id}`);
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
    const handleDelete = async () => {
        try {
          const { data } = await axios.delete(`/api/request/remove/${_id}`);
          if (data?.success) {
            alert("Blog Deleted");
            navigate("/requestTable");
          }
        } catch (error) {
          console.log(error);
        }
      };
    console.log(request);

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-GB');
    };

    return (
      <Fragment>
			 <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
						<div className="col-12 col-md-10">
							<Fragment>
		<div className="container">

			<form >
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
						value={formatDate(inputs.deadline)}
					/* 	onChange={handleChange} */
						className="form-control"
					/>
				</div>
			
				<div className="btn-group">
					<button type="submit" className="btn btn-primary" onClick={handleDelete}>
						Delete
					</button>
					
				</div>
			</form>
		</div>
    </Fragment>
    </div>
    </div>
    </Fragment>
	);
}
export default EditRequest;