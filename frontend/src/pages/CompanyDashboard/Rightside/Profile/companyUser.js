import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../../../actions/userActions";
import { useNavigate} from 'react-router-dom';
import Loader from "./Loader";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;

   const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  console.log(userUpdateProfile);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
    navigate("/");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (userInfo.data) {
      dispatch(getUserDetails());
    }
  }, [dispatch, userInfo.data]);

  const onSubmit = () => {
    dispatch(updateUserProfile(username, email, password));
  };

  return (
    <div className="container">
      {" "}
      <h1>Update Profile</h1>
      {error && <div className="dbmsg">{error.message}</div>}
      <form onSubmit={onSubmit} className="form">
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={userInfo.data.username}
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            required
          />
          {error && error.username && (
            <div className="validatemsg">{error.username}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userInfo.data.username}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            required
          />
          {error && error.email && (
            <div className="validatemsg">{error.email}</div>
          )}
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={userInfo.data.username}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && error.password && (
            <div className="validatemsg">{error.password}</div>
          )}
        </div>
        <button type="submit" >
          Update {loading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default Profile;