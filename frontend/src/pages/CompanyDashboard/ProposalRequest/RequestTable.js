import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import RightSide from "../Rightside/RightSide";
function RequestTable() {


	const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;

  const id = userInfo.data._id;

  // State for the "Add Request" form
  const [inputs, setInputs] = useState({
    title: '',
    text: '',
    deadline: '',
  });
  const [showAddRequest, setShowAddRequest] = useState(false);
    const [requests, setRequests] = useState([]);
	
   
	const getUserRequests = async () => {
		try {
		  const { data } = await axios.get(`/api/request/getCompanyFile/${id}`);
		  if (data?.success) {
			setRequests(data?.Userrequest.requests);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };
	
	  // Function to handle form input changes
	  const onChange = (e) => {
		setInputs((prevState) => ({
		  ...prevState,
		  [e.target.name]: e.target.value,
		}));
	  };
	
	  // Function to handle form submission for adding a new request
	  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const { data } = await axios.post('/api/request/add/', {
			title: inputs.title,
			text: inputs.text,
			deadline: inputs.deadline,
			user: id,
		  });
		  if (data?.success) {
			// After successful submission, fetch the updated list of requests
			getUserRequests();
			// Hide the "Add Request" form and show the "Request Table"
			setShowAddRequest(false);
		  }
		} catch (error) {
		  console.log(error);
		}
	  };
	
	  // Fetch the list of user requests on component mount
	  useEffect(() => {
		getUserRequests();
	  }, []);
	
	  // Toggle between showing "Add Request" form and "Request Table"
	  const toggleAddRequest = () => {
		setShowAddRequest((prevState) => !prevState);
	  };
	  const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-GB');
	  };
	  const handleDelete = async (requestId) => {
        try {
          const { data } = await axios.delete(`/api/request/remove/${requestId}`);
          if (data?.success) {
            alert("Blog Deleted");
			getUserRequests();
          }
        } catch (error) {
          console.log(error);
        }
      };
	
	return (
		<div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">
		  <div className="content-wrapper">
			{showAddRequest ? (
			  // Show the "Add Request" form
			  <Fragment>
				<h2 className="text-center">Proposal Request</h2>
				<form onSubmit={handleSubmit}>
				  {/* ... Add the form fields here (similar to your previous "Add Request" component) ... */}
				  <h2 className="text-center m-3">Add Request</h2>
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
				  <button type="submit" className="btn btn-primary">
					Add
				  </button>
				  </div>
				</form>
			  </Fragment>
			) : (
			  // Show the "Request Table"
			  <Fragment>
				
				<button onClick={toggleAddRequest} className="btn btn-primary mb-3">
				  Add New Request
				</button>
				<h2 className="text-center">Proposal Request</h2>         
				<table className="table table-borderless table-hover">
				  {/* ... Render the table with the list of requests here (similar to your previous "Request Table" component) ... */}
				  
			
				<thead>
					<tr>
						<th>Title</th>
						<th>Text</th>
						<th>Deadline</th>
						<th>Edit</th>
						<th>Delete</th>

						
					</tr>
				</thead>
				<tbody>
					{requests &&
						requests.map((request) => {
							return (
								<tr key={request._id}>
									<td>
											{request.title}
									</td>
									<td>{request.text}</td>
									<td>{formatDate(request.deadline)}</td>
									<td>
										<Link
											to={`/editRequest/${request._id}`}
											className="btn btn-secondary"
										>
											Edit
										</Link>
									</td>
									<td>
									<div className="btn-group">
					<button type="submit" className="btn btn-primary" onClick={() =>handleDelete((request._id))}>
						Delete
					</button>
					
				</div>
									</td> 
									
								</tr>
							);
						})}
				</tbody>
			
			
				</table>
			  </Fragment>
			)}
		  </div>
		</div>
		<RightSide/>
		</div>
		</div>
	  );
}

export default RequestTable;