import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import Sidebar from "../Sidebar";
import RightSide from "../RigtSide/RightSide";


function Projects() {
  const userLoginRes = useSelector((state) => state.userLoginRes);
  const { userInfo } = userLoginRes;
  const id = userInfo.data._id;
  console.log(userInfo.data._id);

  const [project, setProject] = useState([]);
  const [replyMessage, setReplyMessage] = useState({});
  const [receivedReplies, setReceivedReplies] = useState({});
  const [companyReplies, setCompanyReplies] = useState({});

  const firstMessage = useSelector((state) => state.messageReducer.firstMessage);
  /* useEffect(() => {
    // Retrieve the project data from the server and set the initial state
    receiveMessage();
  }, []); */

  useEffect(() => {
    async function getProject() {
      try {
       const response = await axios.get(`http://localhost:5000/message/getResearcherMessage/${id}`);
        const senderMessages = response.data.messages.filter((message) => message.isSenderCompany === true);
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
  }, [id]);

/*   const receiveMessage = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/message/getResearcherMessage/${id}`);
      console.log(response);
      const messages = response.data.messages || [];
      setProject(messages);
    } catch (error) {
      console.log("error", error);
    }
  }; */

  const removeMessage = async (messageId) => {
    try {
      // Make an HTTP DELETE request to the backend route to remove the message
      const response = await axios.delete(`http://localhost:5000/message/remove/${messageId}`);

      // Check if the message was successfully removed
      if (response.status === 200) {
        // Update the state or refresh the messages list as needed
        // For example, you can fetch the updated messages list after removing a message
       // receiveMessage(); 
       console.log("Messaged Removed");
      } else {
        // Handle the error if the message couldn't be removed
        console.log("Error removing the message.");
      }
    } catch (error) {
      console.log("Error removing the message:", error);
    }
  };

  const handleButtonClick = async (message) => {
    try {
      const messageReply = replyMessage[message._id];
      if (!messageReply || messageReply.trim() === "") {
        console.log("Please type a valid reply message!");
        return;
      }

      const { data } = await axios.post("http://localhost:5000/message/addResearcherMessage", {
        title: message.title,
        body: messageReply,
        companyId: message.companyId,
        researcherId: message.researcherId,
        isSenderCompany: false,
        isSenderResearcher: true,
      });

      console.log(data);
      console.log("Reply sent successfully!");
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

      // After successfully updating the read status, update the state to reflect the changes immediately.
      setProject((prevProject) =>
        prevProject.map((message) =>
          message._id === messageId ? { ...message, isRead: true } : message
        )
      );
    } catch (error) {
      console.log(error);
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
              {firstMessage && (
        <div>
          <h6>First Message Details:</h6>
          <h6>{firstMessage.title}</h6>
          <p>{firstMessage.body}</p>
          {/* Display other properties as needed */}
        </div>
      )}
                {project &&
                  project.map((message) => (
                    <div key={message._id}>
                      <h6>{message.isRead ? "Read: " : "Unread: "}</h6>
                      <h6>{message.title}</h6>
                      <p>{message.body}</p>
                      <button
                        onClick={() => markAsRead(message._id, message.isRead)}
                        disabled={message.isRead}
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
                          <h6>Your Reply:</h6>
                          <p>{companyReplies[message._id]}</p>
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Type your reply message"
                        value={replyMessage[message._id] || ""}
                        onChange={(e) =>
                          setReplyMessage((prevReplyMessages) => ({
                            ...prevReplyMessages,
                            [message._id]: e.target.value,
                          }))
                        }
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
