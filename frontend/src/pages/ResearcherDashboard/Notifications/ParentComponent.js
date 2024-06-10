import React, { useState } from "react";
import Projects from "./Projects";
import AddMessage from "./AddMessage";

const ParentComponent = () => {
  const [project, setProject] = useState([]);

  // Function to add a new message to the "project" state
  const addNewMessageToProject = (newMessage) => {
    setProject([...project, newMessage]);
  };

  return (
    <div>
      {/* Pass the "project" state and the "addNewMessageToProject" function to the Projects component */}
      <Projects project={project} />
      {/* Pass the "addNewMessageToProject" function to the AddMessage component */}
      <AddMessage addNewMessageToProject={addNewMessageToProject} />
    </div>
  );
};

export default ParentComponent;