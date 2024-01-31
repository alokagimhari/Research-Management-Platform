import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "./AdminDashboard/components/Sidebar";
import RightSide from "./AdminDashboard/components/RigtSide/RightSide";
function CrudTable() {
	const [cruds, setCruds] = useState([]);
	const [users, setUser] = useState([]);

	useEffect(function () {
		async function getCruds() {
			try {
				const response = await axios.get("/users");
				setCruds(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getCruds();
	}, []);
	useEffect(function () {
		async function getUser() {
			try {
				const response = await axios.get("/userCompany");
				setUser(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getUser();
	}, []);

	return (
		<div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">
			 <div className="content-wrapper">
			<h2 className="text-center">Researcher List</h2>         
			<table className = "table table-borderless table-hover">
				<thead>
					<tr>
						<th>FirstName</th>
						<th>LastName</th>
						<th>Email</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{cruds &&
						cruds.map((crud) => {
							return (
								<tr key={crud._id}>
									<td>
											{crud.first_name}
									</td>
									<td>{crud.last_name}</td>
									<td>{crud.username}</td>
									<td>
										<Link to={`/users/${crud._id}`} className="btn btn-warning">
											View
										</Link>
									</td>
									<td>
										<Link
											to={`/users/${crud._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/users/${crud._id}/delete`}
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
			<h2 className="text-center">Company List</h2> 
			<table className = "table table-borderless table-hover">
				<thead>
					<tr>
						<th>Company Name</th>
						<th>Industry</th>
						<th>Email</th>
						<th>View</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => {
							return (
								<tr key={user._id}>
									<td>
									{user.company_name}
									</td>
									<td>{user.industry}</td>
									<td>{user.username}</td>
									<td>
										<Link to={`/userCompany/${user._id}`} className="btn btn-warning">
											View
										</Link>
									</td>
									<td>
										<Link
											to={`/userCompany/${user._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/userCompany/${user._id}/delete`}
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
		<RightSide/>
		</div>
		</div>
	
	);
}

export default CrudTable;