import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function TableDelete(props) {
	const [reviews, setReview] = useState({});

    const {_id} = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function deleteReview() {
				try {
					const response = await axios.get(`/review/${_id}`);
					setReview(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			deleteReview();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`/review/${_id}`);
			navigate("/Companyreview");
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="container">
			<div className="content-wrapper">
				<div>
			<p>
				<b>Title</b>:  {reviews.title}
			<br></br>
				<b>Text</b>: {reviews.text}
			<br></br>
				<b>Rating</b>: {reviews.rating}
			<br></br>
			</p>
			
			</div>
			<div className="btn-group">
			<br></br>
				<button onClick={handleDelete} className="btn btn-danger">
					Delete
				</button>
				<Link to="/Companyreview" className="btn btn-secondary">
					Cancel{" "}
				</Link>
			</div>
			</div>
			<hr />
		</div>
	);
}

export default TableDelete;