import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";


function RequestTable() {
    const [requests, setrequests] = useState([]);
    const userLoginCom = useSelector((state) => state.userLoginCom);
    const { userInfo } = userLoginCom;
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id
	const getUserrequest = async () => {
        try {
         
          const { data } = await axios.get(`/api/request/getCompanyFile/${id}`);
		  console.log(data);
          if (data?.success) {
            setrequests(data?.Userrequest.requests);
          }
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getUserrequest();
      }, []);
      console.log(requests);


  

	return (
		<div className="container">
			 <div className="content-wrapper">
			<h2 className="text-center">Proposal Request</h2>         
			<table className = "table table-borderless table-hover">
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
									<td>{request.deadline}</td>
									<td>
										<Link
											to={`/editRequest/${request._id}`}
											className="btn btn-secondary"
										>
											Edit
										</Link>
									</td>
									<td>
									<Link
											to={`/deleteRequest/${request._id}`}
											className="btn btn-danger"
										>
											Delete
										</Link>
									</td> 
									
								</tr>
							);
						})}
				</tbody>
			</table>
			
			</div>
			
		</div>
	);
}

export default RequestTable;