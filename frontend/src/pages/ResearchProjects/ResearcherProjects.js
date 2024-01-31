import React, { useState, useRef,useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from "react-redux";
import Dropzone from 'react-dropzone';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../ResearcherDashboard/Sidebar';
import RightSide from '../ResearcherDashboard/RigtSide/RightSide';
//delelte props 
const ResearchProjects = () => {


  const navigate=useNavigate();

    const userLoginRes = useSelector((state) => state.userLoginRes);
    const { userInfo } = userLoginRes;
   
   const id = userInfo.data._id
   console.log(id);
    const {_id} = useParams();
    console.log(_id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
      // Use useEffect to fetch the request data and set the title when the component mounts
      const fetchRequestData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/request/getRequest/${_id}`
          );
          const requestData = response.data; // Assuming the response contains the data object with the title
          console.log(requestData);
          console.log(requestData.request.title);
          setTitle(requestData.request.title);
          setDescription(requestData.request.text) // Set the title state with the fetched title
        } catch (error) {
          // Handle any errors here
          console.error('Error fetching request data:', error);
        }
      };
      fetchRequestData(); // Call the function to fetch request data
  }, [_id]);
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
 /*  const [state, setState] = useState({
    title: '',
    description: '',
  });  */
  
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

/*  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };  */

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
  
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };
  console.log(title);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      /* const { title, description } = state; */
      if (title.trim() !== '' && description.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description', description);
          formData.append('user',userInfo.data._id);
          formData.append('requests',_id);
          setErrorMsg('');
          //changes api
          const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
          const response = await axios.post(`http://localhost:5000/fileUpload`,formData,config);
          console.log('File upload response:', response.data);
        //  navigate("/researcherDashboard");
          
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="App">
		<div className="AppGlass">
		<Sidebar />
    <React.Fragment>
       <div className="row">
      <div className="col-12 col-md-2">
                  
                </div>
                <div className="col-12 col-md-10">
      <Form className="search-form" onSubmit={handleOnSubmit}>
      
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={title}
                /* placeholder="Enter title"
                onChange={handleInputChange} */
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={description}
               /*  placeholder="Enter description"
                onChange={handleInputChange} */
              />
            </Form.Group>
          </Col>
        </Row> 
        <div className="upload-section">
        <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
    {({ getRootProps, getInputProps }) => (
      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
        <input {...getInputProps()} />
        <p>Drag and drop a file OR click here to select a file</p>
        {file && (
          <div>
            <strong>Selected file:</strong> {file.name}
          </div>
        )}
      </div>
    )}
  </Dropzone>
  {previewSrc ? (
    isPreviewAvailable ? (
      <div className="image-preview">
        <img className="preview-image" src={previewSrc} alt="Preview" />
      </div>
    ) : (
      <div className="preview-message">
        <p>No preview available for this file</p>
      </div>
    )
  ) : (
    <div className="preview-message">
      <p>Image preview will be shown here after selection</p>
    </div>
  )}
</div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </div>
    <RightSide/>
    </React.Fragment>
    </div>
		</div>
    
  );
};

export default ResearchProjects;