import React from "react";
import Alert from 'react-bootstrap/Alert';
import "../MainDash.jsx";
import "../MainDash.css";
import "../Sidebar.jsx";
import "../Sidebar.css";
import Data from "../Data/Data";

function Notifications() {
  return (
    <Alert variant="success">
      <Alert.Heading>Hey, nice to see you</Alert.Heading>
      <p>
        Hey Welcome to ideas Research Platform as a Researcher.
      </p>
      
    </Alert>

  );
}

export default Notifications;