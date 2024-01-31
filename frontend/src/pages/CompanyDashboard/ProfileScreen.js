import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { getUserDetails, updateUserProfile } from "../../actions/userActions";


const ProfileScreen = ({location,history}) => {
    
  const [company_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate ()

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo} = userLoginCom;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
 
  useEffect(() => {
    if (!userInfo) {
      navigate("/Companylogin");
    } else {
      if (!user) {
        dispatch(getUserDetails(`profile`));
      } else {
        setName(user.company_name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(updateUserProfile({ id: user._id, company_name, email,password}));
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h1>Update Information</h1>
          {error && <h1 varient="danger">{error}</h1>}
          {success && <h1 variant="success">Profile Updated</h1>}
          {loading && <h1>Loading</h1>}
         
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="company_name">
              <Form.Label>Name : JSON.parse(localStorage.getItem("userInfo"))</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter Name"
                value={company_name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        </Col>
        </Row>
        </>
        )}

        export default ProfileScreen;