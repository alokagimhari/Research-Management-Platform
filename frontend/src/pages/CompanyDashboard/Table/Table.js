/* import * as React from "react"; */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector } from "react-redux";
import "./Table.css";

function createData(date, projects ) {
  return { date, projects };
}

const rows = [
  createData("2022.10.26", "IOT project"),
  createData("2022.10.30 ", "Smart LMS"),
  createData("2022.11.10", "Mobile Application for Riders"),
  createData("2022.11.20", "ideas Platform"),
];

    
 

export default function BasicTable() {
 
  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;
  const id = userInfo.data._id
  const [products, setProducts] = useState([]);
useEffect(() => {
  fetchProducts();
}, []);
const fetchProducts = () => {
  
    /* .get('http://localhost:5000/getAllFiles') */
    axios
    .get(`http://localhost:5000/getRequestByCompany/${id}`)
    .then((res) => {
      console.log(res);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
  return (
      <div className="Table">
      <h3>Recent Projects</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                
                <TableCell align="left">Project Title</TableCell>
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
                  <TableCell align="left">{product.text}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
