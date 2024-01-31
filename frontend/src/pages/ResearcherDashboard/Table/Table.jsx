import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useSelector } from "react-redux";
import "./Table.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
function createData(name, reviews, rates) {
 /*  const reviewResponses = useSelector((state) => state.createReview);
const { error: createReviewError } = reviewResponses; */
  return { name, reviews, rates };
}


const rows = [
  createData("Lasania", "Amazing work", "5/5"),
  createData("Baza Bang ", "Very professional", "3/5"),
  createData("CDC", "Very knowledgeable and finished the work with a timely manner", "4/5"),
  createData("Cupcake", "This is the second time I have used Ann's services", "5/5"),
];

    
 

export default function BasicTable() {
 /*  const [products, setProducts] = useState([]);
useEffect(() => {
  fetchProducts();
}, []);
const fetchProducts = () => {
  axios
    .get('http://localhost:5000/review/allReviews')
    .then((res) => {
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}; */


const userLoginRes = useSelector((state) => state.userLoginRes);
const { userInfo } = userLoginRes;
   const id = userInfo.data._id
  console.log(userInfo.data._id);
  const [products, setProducts] = useState([]);
useEffect(() => {
  fetchProducts();
}, []);
const fetchProducts = () => {
  
    axios
    .get(`http://localhost:5000/getFileByUser/${id}`)
    .then((res) => {
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
/* useEffect(() => {
  const getFilesList = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/getFileByUser/${id}`);
      setErrorMsg('');
      setFilesList(data);
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  getFilesList();
}, []); */
  return (
      <div className="Table">
      <h3>Recent Projects</h3>
     {/*  {createReviewError && (
        <ErrorMessage header="Opps!!!" message={createReviewError} reset={CREATE_REVIEW_RESET} />
      )} */}
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
            {products && products.map((product) => (
                <TableRow
                key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  {product.title}
                  </TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
