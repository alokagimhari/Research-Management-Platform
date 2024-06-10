import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./AdminDashboard/components/Sidebar";
import RightSide from "./AdminDashboard/components/RigtSide/RightSide";
function CrudDelete(props) {
	const [crud, setCrud] = useState({});

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function deleteCrudById() {
				try {
					const response = await axios.get(`/users/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			deleteCrudById();
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
			

			<p>
				<b>FirstName</b>:  {crud.first_name}
			</p>
            <p>
				<b>LastName</b>: {crud.last_name}
			</p>
			<p>
				<b>Email</b>: {crud.username}
			</p>
			
			<p>
				<small>
					<b>ID</b>: {crud._id}
				</small>
			</p>
			<div className="btn-group">
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/users" className="btn btn-secondary">
					Cancel{" "}
				</Link>
			</div>
			<hr />
		</div>
		<RightSide/>
		</div>
		</div>

	);
}

export default CrudDelete;