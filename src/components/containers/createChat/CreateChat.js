import React, { useState } from "react";
import Modal from "./../modal/Modal";
import { IconButton } from "../../elements";
import db from "../../../firebase";

const CreateChat = ({ closeModal, user, open }) => {
  const [channelName, setName] = useState("");
  const [channelDesc, setDesc] = useState("");

  const createChat = (evt) => {
    evt.preventDefault();

    if (channelName !== "") {
      db.collection("rooms").add({
        name: channelName,
        adminId: user.uid,
        createdAt: new Date(),
        createdBy: user.displayName,
        description: channelDesc,
        banList: [],
        isUser: false,
      });

      closeModal();
    }
  };

  return (
    <Modal onClose={closeModal} open={open}>
      <div className="container">
        <div className="modal__header">
          <h3 className="modal_title">Add new channel</h3>
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal__body">
          <input
            type="text"
            className="input"
            placeholder="Name of channel"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows="6"
            type="text"
            className="textArea"
            placeholder="Channel description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="modal__actions">
          <IconButton icon="icon-ok-1" onClick={createChat} />
          <IconButton icon="icon-cancel" onClick={closeModal} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateChat;
