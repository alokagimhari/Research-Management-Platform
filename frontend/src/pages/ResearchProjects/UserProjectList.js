import React, { useState, useEffect,Fragment } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from "react-redux";
//import { API_URL } from '../utils/constants';
import Sidebar from '../CompanyDashboard/Sidebar/Sidebar';
import RightSide from '../CompanyDashboard/Rightside/RightSide';

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  /*const {_id} = useParams();
  console.log(_id);

  const userLoginCom = useSelector((state) => state.userLoginCom);
    const { userInfo } = userLoginCom;
   
    console.log(userInfo.data._id);
    const id = userInfo.data._id

    const { data } = await axios.get(`/api/request/getCompanyFile/${id}`);
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/getAllFilesByRequestID/${_id}`);
        setErrorMsg('');
        setFilesList(data);
        console.log(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []); */
  const userLoginCom = useSelector((state) => state.userLoginCom);
    const { userInfo } = userLoginCom;
    const id = userInfo.data._id;
    console.log(id);
  useEffect(() => {
    

    // First API request to get the response ID
    const getFilesForRequests = async (requestIds) => {
      if (requestIds.length === 0) {
        setErrorMsg('No files found.');
        return;
      }
      
      const currentId = requestIds.shift();
      
      try {
        const { data } = await axios.get(`http://localhost:5000/getAllFilesByRequestID/${currentId}`);
        setFilesList((prevFiles) => [...prevFiles, ...data]);
        getFilesForRequests(requestIds);
      } catch (error) {
        setErrorMsg('Error fetching files.');
      }
    };

    axios.get(`/api/request/getCompanyFile/${id}`)
      .then((response) => {
        const requestIds = response.data.Userrequest.requests.map((item) => item._id);
        getFilesForRequests(requestIds);
      })
      .catch((error) => {
        setErrorMsg('Error fetching requests.');
      });
  }, [id]);

  // ... rest of your code



  const downloadFile = async (_id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:5000/download/${_id}`, {
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

  //updated
 
  return (
    <div className="App">
		<div className="AppGlass">
		<Sidebar />
    <div className="files-container">
      
     {/*  <table className="table table-hover">
        <thead>
          <tr >
            <th>Title</th>
            <th>Description</th>
            <th>Download File</th>
            <th>Add Review</th>
          </tr>
        </thead>
        <tbody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
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
                    <td>
                    <Link to={`/review/${_id}/add`}>Add Review</Link>
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
        
      </table> */}
  <div className="container">
      <div className="file-list">
      <Alert variant="success">
			 					<Alert.Heading>Hey, there is a new proposal submission</Alert.Heading>

                 <div>
  {filesList.length > 0 ? (
    filesList.map(({ _id, title, description, file_path, file_mimetype }) => {
      return (
        <h6 key={_id}>
          Hey, there is a new proposal request;
          The proposal title on&nbsp;{title} &nbsp;which describes the&nbsp;
          {description} &nbsp;
          <br />
          <button className="btn btn-success" onClick={() => downloadFile(_id, file_path, file_mimetype)}>
            Download
          </button>
          {/* <a href="#/" onClick={() => downloadFile(_id, file_path, file_mimetype)}>
            Download
          </a> */}
          <br />
          <br />
          <Link to={`/review/${_id}/add`} className="btn btn-info" >Add Review</Link>
        </h6>
      );
    })
  ) : (
    <p>No files found. Please add some.</p>
  )}
</div>
   								 </Alert>
      </div>
</div>
   
    </div>
    <RightSide/>
    </div>
    </div>
  
  );
};

export default FilesList;