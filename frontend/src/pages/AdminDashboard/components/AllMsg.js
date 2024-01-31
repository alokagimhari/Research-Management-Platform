import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import RightSide from "./RigtSide/RightSide";
function AllMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch all messages from the backend route
    async function fetchMessages() {
      try {
        const response = await axios.get("http://localhost:5000/message/allmsg");
        setMessages(response.data);
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    }

    fetchMessages();
  }, []);
  const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-GB');
	  };

    const handleDeleteMessage = async (messageId) => {
      try {
        // Make an HTTP DELETE request to the backend route to remove the message
        const response = await axios.delete(`http://localhost:5000/message/remove/${messageId}`);
  
        // Check if the message was successfully removed
        if (response.status === 200) {
          // Filter out the deleted message from the state
          setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
        } else {
          // Handle the error if the message couldn't be removed
          console.log("Error removing the message.");
        }
      } catch (error) {
        console.log("Error removing the message:", error);
      }
    };
  return (
    <div className="App">
		<div className="AppGlass">
		<Sidebar />
    <div>
      <h1>All Messages</h1>
      <ul>
        {messages.map((message) => {
          // Determine if the logged-in user is the sender
          const isSender = message.isSenderCompany || message.isSenderResearcher;
          const senderId = isSender ? message.companyId : message.researcherId;
          const receiverId = isSender ? message.researcherId : message.companyId;
          return (
            <li key={message._id}>
              <h3>Title: {message.title}</h3>
              <p>Body: {message.body}</p>
              {/* Display the ID of the sender */}
              <p>Sender ID: {senderId}</p>
              <p>Receiver ID: {receiverId}</p>
              <button onClick={() => handleDeleteMessage(message._id)} className="btn btn-success">Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
    <RightSide/>
       </div>
       </div>
  );
}

export default AllMessages;
