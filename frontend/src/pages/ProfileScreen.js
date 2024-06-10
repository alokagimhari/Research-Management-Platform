import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileCom } from "../actions/userActions";
import { Navigate, useNavigate} from 'react-router-dom';

const ProfileScreen = () => {
 

  const dispatch = useDispatch();

  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;

  const [company_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const navigate = useNavigate ()
  useEffect(() => {
    if (!userInfo) {
     navigate("/");
    } else {
      setName(userInfo.company_name);
      setEmail(userInfo.email);
      setIndustry(userInfo.industry);
    }
  }, [navigate, userInfo]);

  /* const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
 */
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfileCom({ company_name, email,industry, pic }));
  };

  return (
    <div className="container">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="company_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={company_name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="industry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Industry Name"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                ></Form.Control>
              </Form.Group>
             {/*  <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group> */}
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt="pic" className="profilePic" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileScreen;