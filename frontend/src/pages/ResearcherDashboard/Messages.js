import { useEffect, useState } from "react";
import Message from "./Message/Message.js";
import NewMsgBtn from "./Message/NewMsgBtn.js";
import Loader from "./Message/Loader.js";
import axios from "axios";
import './style.css';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [hasDocs, setHasDocs] = useState(true);
  // for spinner
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (messages.length < totalDocs) {
      setHasDocs(true);
    } else {
      setHasDocs(false);
    }
  }, [messages, totalDocs]);

  async function getMessages() {
    try {
      const response = await axios.get('http://localhost:5000/getAllMessages', {
        params: {
          skip: 0,
          limit: 5,
        },
      });
      await setMessages(response.data.allMessages);
      await setTotalDocs(response.data.numberOfDocs);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadMoreMessages(limit, skip) {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/getAllMessages', {
        params: {
          limit,
          skip,
        },
      });
      await setMessages((prevMsg) => [
        ...prevMsg,
        ...response.data.allMessages,
      ]);
      await setTotalDocs(response.data.numberOfDocs);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  const messageComponents = messages.map((msg) => (
    <Message
      key={msg._id}
      {...msg}
      getMessages={getMessages}
      setMessages={setMessages}
      setLoading={setLoading}
    />
  ));

  return (
    <div className="App">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <header className="header">
            <h2>Message Board</h2>
          </header>
          <main>
            <NewMsgBtn getMessages={getMessages} setLoading={setLoading} />
            <div>{messageComponents}</div>
            {hasDocs && (
              <button
                className="load-more-btn"
                onClick={() => loadMoreMessages(3, messages.length)}
              >
                Load more
              </button>
            )}
          </main>
         
        </>
      )}
    </div>
  );
}
export default Messages;
