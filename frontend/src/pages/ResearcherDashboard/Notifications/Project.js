import React, { Fragment,useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import Sidebar from "../Sidebar";
import RightSide from '../RigtSide/RightSide';
function Projects() {

	
	const userLoginRes = useSelector((state) => state.userLoginRes);
	const { userInfo } = userLoginRes;
	 
	const [project, setproject] = useState([]);

	useEffect(function () {
		async function getproject() {
			try {
				const response = await axios.get("http://localhost:5000/api/request");
				setproject(response.data);
				console.log(response);
			} catch (error) {
				console.log("error", error);
			}
		}
		getproject();
	}, []);
	
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-GB');
	  };
	  const isDeadlineFuture = (deadline) => {
		const deadlineDate = new Date(deadline);
		const currentDate = new Date();
		return deadlineDate > currentDate;
	  };
	  const filteredProjects = project.filter((crud) => isDeadlineFuture(crud.deadline));
	return (
		<div className="App">
		<div className="AppGlass">
		<Sidebar />
		{/* <Fragment>
			
			 <div className="row">
                <div className="col-12 col-md-2">
                    
                </div>
						<div className="col-12 col-md-10">
							<Fragment> */}
								<div className="container bg-dark text-white">
			
			 					<div className="wrapper my-5"> 
			 					<Alert variant="success">
			 					<Alert.Heading>Hey, there is a new proposal request</Alert.Heading>

      									<div>
											{filteredProjects.map((crud) => (
																
																		<h6 key={crud._id}>
																			Hey, there is a new proposal request;
																			The proposal title on&nbsp; 
																			{crud.title} &nbsp;
																			should be described the&nbsp;
																			{crud.text} &nbsp;
																			which created on&nbsp;
																			{formatDate(crud.createdAt)} &nbsp;
																			and the deadline will be&nbsp;
																			{formatDate(crud.deadline)}
																			<br/>
																			<Link
																					to={`/researchProjects/${crud._id}`}
																					className="btn btn-success"
																				>
																					Add Proposal
																				</Link>
																				<br/>
																				<br/>
																				<Link
																				
																					to={`/addresearchMessage/${crud.user}/add/${crud.title}`}
																					className="btn btn-info"
																				>
																					Add Message
																				</Link>
																		</h6>
																		
																	
																	
																		))}
											</div>
      
   								 </Alert>
			
			
			</div>
			</div>
			<RightSide/>
			{/* </Fragment>
		</div>
		</div>
		
		</Fragment> */}
		</div>
		</div>
	);
}

export default Projects;