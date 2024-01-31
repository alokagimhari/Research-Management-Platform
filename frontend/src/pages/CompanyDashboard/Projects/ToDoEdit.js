import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ToDoEdit(props) {
	const initialState = {
        company_name:"",
		title: "",
		text: "",
		deadline: "",
	};
	const [Request, setRequest] = useState(initialState);

	const { _id} = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateRequest() {
				try {
					const response = await axios.get(`http://localhost:5000/req/${_id}`);
					setRequest(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateRequest();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateRequest() {
			try {
				await axios.patch(`http://localhost:5000/req/${Request._id}`, Request);
			navigate(`/req`);
			} catch (error) {
				console.log(error);
			}
		}
		updateRequest();
	}

	function handleChange(event) {
		setRequest({ ...Request, [event.target.name]: event.target.value });
	}

function handleCancel() {
		navigate(`/req`);
	} 

	return (
		<div className="container">
			
			<hr />
			<form onSubmit={handleSubmit}>
				<h1>Edit</h1>
                <div className="form-group">
					<label>Company Name</label>
					<input
						name="company_name"
						type="text"
						value={Request.company_name}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Title</label>
					<input
						name="title"
						type="text"
						value={Request.title}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Text</label>
					<input
						name="text"
						type="text"
						value={Request.text}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Deadline</label>
					<input
						name="deadline"
						type="date"
						value={Request.deadline}
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
	);
}

export default ToDoEdit;