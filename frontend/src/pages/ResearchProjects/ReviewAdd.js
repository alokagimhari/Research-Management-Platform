import React, { useState,useEffect,Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Sidebar from "../CompanyDashboard/Sidebar/Sidebar";
import RightSide from "../CompanyDashboard/Rightside/RightSide";

export default function ReviewAdd() {
 
    const {_id} = useParams();
    console.log(_id);
    const [review, setReview] = useState({
    title:"",
    text:"",
    rating:"",
    approve:""
    })
    
    const navigate=useNavigate();

    useEffect(() => {
      // Use useEffect to fetch the request data and set the title when the component mounts
      const fetchRequestData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/getfileByID/${_id}`
          );
          const requestData = response.data; // Assuming the response contains the data object with the title
          console.log(requestData.fileone);
         // Set the title state with the fetched title
          updateForm({ title: requestData.fileone.title});
        } catch (error) {
          // Handle any errors here
          console.error('Error fetching request data:', error);
        }
      };
      fetchRequestData(); // Call the function to fetch request data
  }, [_id]);



    function updateForm(value) {
      return setReview((prev) => {
        return { ...prev, ...value };
      });
    }
    async function onSubmit(e) {
      e.preventDefault();
      
      const newReview = { ...review };
      
      await fetch(`http://localhost:5000/review/add/${_id}`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newReview),
     
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setReview({ title: "", text: "", rating: "",approve:"" });
  }
    /* useEffect(function () {
		async function CreateReview() {
			try {
				const response = await axios.post(`http://localhost:5000/review/add/${_id}`);
				setReview(response.data);
			} catch (error) {
				console.log("error", error);
			}
		}
		CreateReview();
	}, [props]);

    const onChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }
    const saveReview = (e) => {
        e.preventDefault()
        onCreate(review)
    } */

    return(
      <div className="App">
		<div className="AppGlass">
		<Sidebar />
      <div>
      <h3>Add Review</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={review.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Comment</label>
          <input
            type="text"
            className="form-control"
            id="text"
            value={review.text}
            onChange={(e) => updateForm({ text: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <div className="form-check form-check-inline">
          
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="1"
              value="1"
              checked={review.rating === "1"}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
            <label htmlFor="1" className="form-check-label">1</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="2"
              value="2"
              checked={review.rating === "2"}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
            <label htmlFor="2" className="form-check-label">2</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="3"
              value="3"
              checked={review.rating === "3"}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
            <label htmlFor="3" className="form-check-label">3</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="4"
              value="4"
              checked={review.rating === "4"}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
            <label htmlFor="4" className="form-check-label">4</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="rating"
              id="5"
              value="5"
              checked={review.rating === "5"}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
            <label htmlFor="5" className="form-check-label">5</label>
          </div>
          </div>
          <div className="form-group">
          <label htmlFor="approve">Approve</label>
          <div className="form-check form-check-inline">
          <input
              className="form-check-input"
              type="radio"
              name="approve"
              id="true"
              value="true"
              checked={review.approve === "true"}
              onChange={(e) => updateForm({ approve: e.target.value })}
            />
            <label htmlFor="1" className="form-check-label">Yes</label>
          </div>
          <div className="form-check form-check-inline">
          <input
              className="form-check-input"
              type="radio"
              name="approve"
              id="false"
              value="false"
              checked={review.approve === "false"}
              onChange={(e) => updateForm({ approve: e.target.value })}
            />
            <label htmlFor="1" className="form-check-label">No</label>
          </div>
          </div>
        <div className="form-group">
          <input
            type="submit"
            value="Sumbit"
            className="btn btn-primary" 
          />
        </div>
      </form>
    </div>
           <RightSide/>
           </div>
           </div>
      
    );
}
