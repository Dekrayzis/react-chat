/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import firebase from "firebase";

//-- Elements
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import { IconButton } from "./../../elements";

//-- Firebase store
import db from "../../../firebase";
import { useStateValue } from "../../../context/StateProvider";
import FileModal from "./../../elements/modal/FileModal";

const ChatFooter = ({ channelID }) => {
  const [{ user }] = useStateValue();
  const [uploadModal, setUploadModal] = useState(false);
  const [fileUrl, setURL] = useState(null);

  //-- Messages
  const [newMessage, setNewMessage] = useState("");

  //-- Emoji picker
  const [emojiPicker, setEmojiPicker] = useState(false);

  const handleEmojiPicker = () => {
    setEmojiPicker(!emojiPicker);
  };

  const createMessage = () => {
    const message = {
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user.uid,
    };

    if (fileUrl !== null) {
      message["image"] = fileUrl;
      setURL(null);
    } else {
      message["message"] = newMessage;
    }
    return message;
  };

  const sendMessage = (ev) => {
    if (ev) {
      ev.preventDefault();
    }

    const message = createMessage();
    db.collection("rooms").doc(channelID).collection("messages").add(message);
    setNewMessage("");
  };

  const openModal = () => setUploadModal(true);
  const closeModal = () => {
    setUploadModal(false);
  };

  const handleUpload = (file, metaData) => {
    const uploadTask = firebase.storage().ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      firebase
        .storage()
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setURL(url);
        });
    });
  };

  useEffect(() => {
    if (fileUrl !== null) {
      sendMessage();
    }
  }, [fileUrl]);

  return (
    <>
      {emojiPicker && (
        <EmojiPicker
          currentMsg={newMessage}
          updateMessage={setNewMessage}
          showEmojiWindow={emojiPicker}
        />
      )}
      <div className="chatWindow__footer">
        <IconButton icon="icon-emo-happy" onClick={handleEmojiPicker} />
        <form action="/">
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
        <IconButton
          icon="icon-attach"
          onClick={() => openModal(!uploadModal)}
        />
        <FileModal
          closeModal={closeModal}
          modal={uploadModal}
          uploadFile={handleUpload}
        />
      </div>
    </>
  );
};

export default ChatFooter;
