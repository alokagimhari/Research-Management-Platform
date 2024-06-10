import React, { useState, useEffect,Fragment } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../pages/AdminDashboard/components/Sidebar";
import RightSide from "../pages/AdminDashboard/components/RigtSide/RightSide";
function TableDetails(props) {
	const [review, setReview] = useState({});

	const  {_id}  = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getReviewsById() {
				try {
					const response = await axios.get(`http://localhost:5000/review/${_id}`);
					setReview(response.data);
				} catch (error) {
					console.log("error");
				}
			}
			getReviewsById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`/review/${_id}`);
			navigate("/review");
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
			<h2 className="text-center">Review Detail</h2>
			<div>
			<p>
				<b>Title</b>: 
				{review.title}
				<br></br>
				<b>Text</b>: {review.text}
				<br></br>
				<b>Rating</b>: {review.rating}
				<br></br>
				
			</p>
			</div>	
			<div className="btn-group ">
				<br></br>
				<Link to={`/review/${review._id}/edit`} className="btn btn-primary">
					Edit
				</Link>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/review" className="btn btn-secondary">
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

export default TableDetails;