import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import '../Navbar/Navbar.css';
import logo from '../Navbar/ideas.png';
const Header = () => {
  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;
  const dispatch = useDispatch();

  return (
    <>
      <Nav bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container className="navbar">
       <LinkContainer to="/" className="logo">
            <img src={logo} alt="logo" />
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link className="link">
                  <i className="fas fa-shopping-cart"></i>
                  &nbsp; About
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.email}>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {/* <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> */}
                </NavDropdown>
              ) : (
                <LinkContainer to="/welcome">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    &nbsp; singin
                  </Nav.Link>
                  
                </LinkContainer>
                
              )}
               <LinkContainer to="/registrationform">
                  <Nav.Link>
                    <i className="fas fa-user"></i>
                    &nbsp; Regsister
                  </Nav.Link>
                  
                </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Nav>
    </>
  );
};

export default Header;