import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../AdminDashboard/components/Sidebar";
import RightSide from "../AdminDashboard/components/RigtSide/RightSide";
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
					const response = await axios.get(`http://localhost:5000/userCompany/${_id}`);
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
				await axios.put(`http://localhost:5000/userCompany/${crud._id}`, crud);
				navigate(`/userCompany/${crud._id}`);
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
		navigate(`/userCompany/${crud._id}`);
	}

	return (
		<Fragment>
			<div className="App">
		<div className="AppGlass">
		<Sidebar />
		<div className="container">
			
			<hr />
			<form onSubmit={handleSubmit}>
				<h1>Edit</h1>
				<div className="form-group">
					<label>Company</label>
					<input
						name="first_name"
						type="text"
						value={crud.company_name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Industry</label>
					<input
						name="industry"
						type="text"
				
						required
						value={crud.industry}
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
		</Fragment>
	);
}

export default CrudEdit;