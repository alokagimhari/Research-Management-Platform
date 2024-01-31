import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../pages/AdminDashboard/components/Sidebar";
import RightSide from "../pages/AdminDashboard/components/RigtSide/RightSide";
function TableEdit(props) {
	const initialState = {
		title: "",
		text: "",
		rating: "",
	};
	const [review, setReview] = useState(initialState);

	const { _id} = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function updateReview() {
				try {
					const response = await axios.get(`http://localhost:5000/review/${_id}`);
					setReview(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			updateReview();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	function handleSubmit(event) {
		event.preventDefault();
		async function updateReview() {
			try {
				await axios.patch(`http://localhost:5000/review/${review._id}`, review);
			navigate(`/review`);
			} catch (error) {
				console.log(error);
			}
		}
		updateReview();
	}

	function handleChange(event) {
		setReview({ ...review, [event.target.name]: event.target.value });
	}

function handleCancel() {
		navigate(`/review`);
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
					<label>Title</label>
					<input
						name="title"
						type="text"
						value={review.title}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Text</label>
					<input
						name="text"
						type="text"
						value={review.text}
						onChange={handleChange}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Rating</label>
					<input
						name="rating"
						type="number"

						value={review.rating}
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

export default TableEdit;