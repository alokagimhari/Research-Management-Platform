import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';

function Projects() {

	const userLoginCom = useSelector((state) => state.userLoginCom);
	const { userInfo } = userLoginRes;
	   const id = userInfo.data._id
    console.log(userInfo.data._id);
	const [project, setproject] = useState([]);

	useEffect(function () {
		async function getproject() {
			try {
				const response = await axios.get("http://localhost:5000/getCompanyMessage/${id}");
				setproject(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getproject();
	}, []);

	return (
		
		<div className="container bg-dark text-white">
			 <div className="content-wrapper">
			 <Alert variant="success">
			 <Alert.Heading>Hey, there is a new Message</Alert.Heading>
      <div>
	  {project &&
						project.map((crud) => {
							return (
								<h6 key={crud._id}>
									Hey, there is a new Message;
									The message is on&nbsp; 
									{crud.title} &nbsp;
									which described about the;
									{crud.body} &nbsp;
									<br/>
                                       {/*  <Link
											to={`/AddresearchMessage/${crud._id}`}
											className="btn btn-success"
										>
											Send a Message
										</Link>  */}  
								</h6>
								
							);
							
						})}
      </div>
      
    </Alert>
			</div>
		</div>
	);
}

export default Projects;