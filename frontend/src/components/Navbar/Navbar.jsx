import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import logo from '../Navbar/ideas.png';
import { useEffect } from 'react';
import '../Navbar/Navbar.css';
import { logout } from '../../actions/userActions';

const Navbar = () => {
  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;
  const dispatch = useDispatch();
  useEffect(() => {}, [userInfo]);
  const [navlinkopen, navlinktogle] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleToggle = () => {
    navlinktogle(!navlinkopen);
  };

  const renderClass = () => {
    let classes = 'navlinks';
    if (navlinkopen) {
      classes += ' active';
    }
    return classes;
  };
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        
        <ul className={renderClass()}>
        {userInfo ? (
           <>
           <li onClick={logoutHandler}>
            <a href="/">LogOut</a>
          </li>
          </>
          ) : (
          <>
          <li className="link login-btn">
            
            <a href="/welcome">
              Login
            </a>
          </li>
        
          <li className="link register-btn">
            <a href="/registrationform">Register</a>
          </li>
          <li className="link">
            <a href="/">About</a>
          </li>
          </>
          
          )}
         
        </ul>
        <div onClick={handleToggle} className="hamburger-toggle">
          <i class="fa-solid fa-bars"></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
