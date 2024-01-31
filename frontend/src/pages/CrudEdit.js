import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./AdminDashboard/components/Sidebar";
import RightSide from "./AdminDashboard/components/RigtSide/RightSide";
function CrudEdit(props) {
	const initialState = {
		first_name: "",
		last_name: "",
		username: "",
	};
	const [crud, setCrud] = useState(initialState);

	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateCrud() {
				try {
					const response = await axios.get(`http://localhost:5000/users/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateCrud();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateCrud() {
			try {
				await axios.put(`http://localhost:5000/users/${crud._id}`, crud);
				navigate(`/users/${crud._id}`);
			} catch (error) {
				console.log(error);
			}
		}
		updateCrud();
	}

	function handleChange(event) {
		setCrud({ ...crud, [event.target.name]: event.target.value });
	}

	function handleCancel() {
		navigate(`/users/${crud._id}`);
	}

	return (
		<div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">
			
			<hr />
			<form onSubmit={handleSubmit}>
				<h1>Edit</h1>
				<div className="form-group">
					<label>first_name</label>
					<input
						name="first_name"
						type="text"
						value={crud.first_name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>LastName</label>
					<input
						name="last_name"
						type="text"
				
						required
						value={crud.last_name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Email</label>
					<input
						name="email"
						type="email"
						required
						value={crud.email}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				
				<div className="btn-group">
					<button type="submit" className="btn btn-primary">
						Update
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="btn btn-secondary"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
		<RightSide/>
		</div>
		</div>
	);
}

export default CrudEdit;