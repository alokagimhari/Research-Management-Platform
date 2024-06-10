import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import Sidebar from "../Sidebar/Sidebar";
import RightSide from "../Rightside/RightSide";

function Projects() {
  const userLoginCom = useSelector((state) => state.userLoginCom);
  const { userInfo } = userLoginCom;
  const _id = userInfo.data._id;

  const [project, setProject] = useState([]);
  const [replyMessage, setReplyMessage] = useState({});
  const [companyReplies, setCompanyReplies] = useState({});
  const [receivedReplies, setReceivedReplies] = useState({});

/*   useEffect(() => {
    // Retrieve the project data from the server and set the initial state
    receiveMessage();
  }, []); */

   const removeMessage = async (messageId) => {
    try {
      // Make an HTTP DELETE request to the backend route to remove the message
      const response = await axios.delete(`http://localhost:5000/message/remove/${messageId}`);

      // Check if the message was successfully removed
      if (response.status === 200) {
        // Update the state or refresh the messages list as needed
        // For example, you can fetch the updated messages list after removing a message
        //receiveMessage();
        console.log("Messaged Removed");
      } else {
        // Handle the error if the message couldn't be removed
        console.log("Error removing the message.");
      }
    } catch (error) {
      console.log("Error removing the message:", error);
    }
  };
  /* const receiveMessage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/message/getCompanyMessage/${_id}`);
      console.log(response.data.messages);
      
      // Ensure messages is always an array, even if there's only one message
      const messagesArray = Array.isArray(response.data.messages) ? response.data.messages : [response.data.messages];
      
      setProject(messagesArray);
    } catch (error) {
      console.log("Error:", error);
    }
  }; */

  useEffect(() => {
    async function getProject() {
      try {
        const response = await axios.get(`http://localhost:5000/message/getCompanyMessage/${_id}`);
        const senderMessages = response.data.messages.filter((message) => message.isSenderCompany === false);
        setProject(senderMessages);
      } catch (error) {
        console.log("error", error);
      }
    }
    getProject();
    const storedReceivedReplies = localStorage.getItem("receivedReplies");
    if (storedReceivedReplies) {
      setReceivedReplies(JSON.parse(storedReceivedReplies));
    }

    const storedCompanyReplies = localStorage.getItem("companyReplies");
    if (storedCompanyReplies) {
      setCompanyReplies(JSON.parse(storedCompanyReplies));
    }
  }, [_id]);

  const handleButtonClick = async (message) => {
    try {
      const messageReply = replyMessage[message._id];
      if (!messageReply || messageReply.trim() === "") {
        console.log("Please type a valid reply message!");
        return;
      }

      const { data } = await axios.post("http://localhost:5000/message/addCompanyMessage", {
        title: message.title,
        body: messageReply,
        companyId: message.companyId,
        researcherId: message.researcherId,
        isSenderCompany: true,
        isSenderResearcher: false
      });

      console.log(data);
	  
      setCompanyReplies((prevCompanyReplies) => ({ ...prevCompanyReplies, [message._id]: messageReply }));
      localStorage.setItem("companyReplies", JSON.stringify({ ...companyReplies, [message._id]: messageReply }));
    } catch (error) {
      console.log("Error sending reply:", error);
    }
  };

  const markAsRead = async (messageId, isRead) => {
    try {
      if (isRead) {
        console.log("Message is already marked as read.");
        return;
      }

      await axios.patch(`/message/${messageId}/markAsRead`, { isRead });
      
      // After successfully updating the read status, update the state in your component to reflect the changes immediately.
      setProject((prevProject) =>
        prevProject.map((message) =>
          message._id === messageId ? { ...message, isRead: true } : message
        )
      );
      
      // Update the local storage as well
      localStorage.setItem("project", JSON.stringify(project));
    } catch (error) {
      console.log("Error marking message as read:", error);
    }
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="container bg-dark text-white">
          <div className="content-wrapper">
            <Alert variant="success">
              <Alert.Heading>Hey, there is a new Message</Alert.Heading>
              <div>
                {project.map((message) => (
                  <div key={message._id}>
                    <h6>{message.isRead ? "Read: " : "Unread: "}</h6>
                    <h6>{message.title}</h6>
                    <p>{message.body}</p>
                    <button
                      onClick={() => markAsRead(message._id, message.isRead)}
                      disabled={message.isRead} // Disable the button if the message is already marked as read
                    >
                      Mark as Read
                    </button>
					{receivedReplies[message._id] && (
                    <div>
                      <h6>Received Reply:</h6>
                      <p>{receivedReplies[message._id]}</p>
                    </div>
                  )}

                  {companyReplies[message._id] && (
                    <div>
                      <h6>Company Reply:</h6>
                      <p>{companyReplies[message._id]}</p>
                    </div>
                  )}
     {/*  <input
        type="text"
        placeholder="Type your reply message"
        value={replyMessage[message._id] || ""}
        onChange={(e) =>
          setReplyMessage((prevReplyMessages) => ({
            ...prevReplyMessages,
            [message._id]: e.target.value,
          }))
        }
      /> */}
                    <input
                      type="text"
                      placeholder="Type your reply message"
                      value={replyMessage[message._id] || ""}
                      onChange={(e) => setReplyMessage((prevReplyMessages) => ({ ...prevReplyMessages, [message._id]: e.target.value }))}
                    />
                    <button onClick={() => handleButtonClick(message)} className="btn btn-success">
                      Send Reply
                    </button>
					 {/* Add the "Remove" button */}
					 <button onClick={() => removeMessage(message._id)} className="btn btn-warning">Remove</button>
                  </div>
                ))}
              </div>
            </Alert>
          </div>
        </div>
        <RightSide />
      </div>
    </div>
  );
}

export default Projects;
