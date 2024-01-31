import React, { Fragment,useState, useEffect } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import {useSelector } from "react-redux";
import { Link} from 'react-router-dom';
import Sidebar from "../ResearcherDashboard/Sidebar";
//import { API_URL } from '../utils/constants';
import RightSide from '../ResearcherDashboard/RigtSide/RightSide';
const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
 
  const userLoginRes = useSelector((state) => state.userLoginRes);
	const { userInfo } = userLoginRes;
	   const id = userInfo.data._id
    console.log(userInfo.data._id);

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data: filesData } = await axios.get(`http://localhost:5000/getFileByUser/${id}`);
        setErrorMsg('');
  
        // Fetch the approval status for each file and update the filesData with the "approve" field
        const filesWithApprove = await Promise.all(
          filesData.map(async (file) => {
            const response = await axios.get(`http://localhost:5000/getReviewforUser/${file._id}`);
            const approve = response.data[0]?.approve;
            console.log(approve);
           // return { ...file, approve: response.data.approve };
           return { ...file, approve };
          })
        );
  
        setFilesList(filesWithApprove);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };
  
    getFilesList()}, [id]);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:5000/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };

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
            <th>Description</th>
            <th>Download File</th>
            <th>Approve</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype,approve}) => (
                <tr key={_id}>
                  <td className="file-title">{title}</td>
                  <td className="file-description">{description}</td>
                  <td>
                    <a
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download
                    </a>
                    
                  </td>
                  <td>{approve ? 'Approved' : 'Not Approved'}</td>
                  <td>
                    <Link
                     to={`/reviewFile/${_id}`}
                     className="btn btn-success"
                    >
                      Review
                    </Link>
                  </td>
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