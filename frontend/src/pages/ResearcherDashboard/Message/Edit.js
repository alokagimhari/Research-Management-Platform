import { useState } from "react";
import Modal from "./Modal.js";
import axios from "axios";
import PencilIcon from "./icons/PencilIcon.js";

export default function Edit(props) {
  const { _id, getMessages, title, body, username, setLoading } = props;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title,
    body,
    username,
  });

  const editMessage = async (e) => {
    e.preventDefault();
    try {
      if (
        title !== values.title ||
        body !== values.body ||
        username !== values.username
      ) {
        await setLoading(true);
        await axios.put("http://localhost:5000/updateMessage", {
          ...values,
          id: _id,
        });
        await setOpen(false);
        getMessages();
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  function closeModal() {
    setValues({
      title,
      body,
      username,
    });
    setOpen(false);
  }

  return (
    <>
      <button className="pencil" onClick={() => setOpen(true)}>
        <PencilIcon />
      </button>
      {open && (
        <Modal
          {...values}
          setValues={setValues}
          closeModal={closeModal}
          editMessage={editMessage}
        />
      )}
    </>
  );
}