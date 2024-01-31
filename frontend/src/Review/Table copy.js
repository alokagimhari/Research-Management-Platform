import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Table() {
	const [reviews, setReview] = useState([]);

    
	useEffect(function () {
		async function getReview() {
			try {
				const response = await axios.get("http://localhost:5000/review/allReviews");
				setReview(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		getReview();
	}, []);
    return(
    <div className="container bg-dark text-white">
			 <div className="content-wrapper">
			<h2 className="text-center">ReviewTable</h2>
                        <div className = "row">
			<table className = "table table-striped">
				<thead className="table-light">
					<tr>
						<th>Title</th>
						<th>Text</th>
						<th>Rating</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{reviews &&
						reviews.map((review) => {
							return (
								<tr key={review._id}>
									<td>
									{review.title}
									</td>
									<td>{review.text}</td>
									<td>{review.rating}</td>
									<td>
										<Link
											to={`/Companyreview/${review._id}/edit`}
											className="btn btn-success"
										>
											Edit
										</Link>
									</td>
									<td>
										<Link
											to={`/Companyreview/${review._id}/delete`}
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
		</div>
	);
}

export default Table;