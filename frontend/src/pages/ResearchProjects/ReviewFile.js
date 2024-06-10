import React, { useState, useEffect,Fragment } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import {useSelector } from "react-redux";
import { Link, useParams} from 'react-router-dom';
import Sidebar from '../ResearcherDashboard/Sidebar';
import RightSide from '../ResearcherDashboard/RigtSide/RightSide';
//import { API_URL } from '../utils/constants';

const FilesList = () => {
  const [filesLists, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
 

    const {_id} = useParams();
    console.log(_id);
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const  {data}  = await axios.get(`http://localhost:5000/getReviewforUser/${_id}`);
        setFilesList(data);
       console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

 

  return (
    <div className="App">
		<div className="AppGlass">
		<Sidebar />
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <table className="table table-hover">
        <thead>
          <tr >
            <th>Title</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {filesLists.length > 0 ? (
            filesLists.map(
              ({ _id, title, text, rating,approve}) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{text}</td>
                  <td className="file-rating">{rating}</td>
                  <td className="file-approve">{approve ? "Approved" : "Not Approved"}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ fontWeight: '300' }}>
                No files found. Please add some.
              </td>
            </tr>
          )}
        </tbody>
       
      </table>
      
    </div>
    <RightSide/>
    </div>
    </div>
  );
};

export default FilesList;