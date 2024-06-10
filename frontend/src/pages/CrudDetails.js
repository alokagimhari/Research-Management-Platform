import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./AdminDashboard/components/Sidebar";
import RightSide from "./AdminDashboard/components/RigtSide/RightSide";

function CrudDetails(props) {
	const [crud, setCrud] = useState({});

	const  {_id}  = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`http://localhost:5000/users/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error");
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`/users/${_id}`);
			navigate("/users");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">
			<div className="content-wrapper">
			<h2 className="text-center">User Detail</h2>
			<div>
			<p>
				<b>First Name</b>: 
				{crud.first_name}
				<br></br>
				<b>Last Name</b>: {crud.last_name}
				<br></br>
				<b>Phone</b>: {crud.contact}
				<br></br>
				<b>Username</b>: {crud.username}
				<br></br>
				<b>Location</b>: {crud.country}
				<br></br>
				<small>
					<b>ID</b>: {crud._id}
				</small>
				<br></br>
			</p>
			</div>	
			<div className="btn-group ">
				<br></br>
				<Link to={`/users/${crud._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/users" className="btn btn-secondary">
					Close
				</Link>
			</div>
			</div>
			<hr />
		</div>
		<RightSide/>
		</div>
		</div>
	);
}

export default CrudDetails;