import React, { useState } from "react";
import mime from "mime-types";
import IconButton from "../buttons/IconButton";

import "./modal.scss";

const FileModal = ({ modal, closeModal, uploadFile }) => {
  const [file, setFile] = useState(null);
  const authorized = ["image/jpeg", "image/png", "image/gif"];

  const addFile = (ev) => {
    const newfile = ev.target.files[0];
    if (newfile) {
      setFile(newfile);
    }
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metaData = {
          contentType: mime.lookup(file.name),
        };
        uploadFile(file, metaData);
        closeModal();
        setFile(null);
      }
    }
  };

  const isAuthorized = (filename) => authorized.includes(mime.lookup(filename));

  return (
    <div className={modal ? "modal__window open" : "modal__window"}>
      <div className="modal__selection">
        <label>File types: jpg, png, gif</label>
        <input type="file" onChange={addFile} />
      </div>
      <div className="modal__footer">
        <IconButton icon="icon-upload-cloud" onClick={sendFile} />
        <IconButton icon="icon-cancel" onClick={closeModal} />
      </div>
    </div>
  );
};

export default FileModal;
