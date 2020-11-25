/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

//-- Elements
import Avatar from "./../../elements/Avatar/Avatar";
import IconButton from "./../../elements/buttons/IconButton";

//-- Containers
import ChatDetails from "../chatDetails";
import AllChanelsPanel from "../allChannels/AllChanelsPanel";
// import UserDetails from "../chatDetails/UserDetails";

import { useStateValue } from "../../../context/StateProvider";

//-- Store
import db from "../../../firebase";

//-- Styles
import "./chatWindow.scss";
import ChatFooter from "./ChatFooter";

const ChatWindow = () => {
  // asssasins creed room
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChatDetails, setToggleChatDetails] = useState(false);

  //-- Messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentChannel.id) {
      db.collection("rooms")
        .doc(currentChannel.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapShot) =>
          setMessages(() => snapShot.docs.map((doc) => doc.data()))
        );
    }
  }, [currentChannel.id]);

  const isImage = (message) => {
    return (
      message.hasOwnProperty("image") && !message.hasOwnProperty("message")
    );
  };

  return (
    <>
      {/* All channels panel */}
      {showAllChannels && <AllChanelsPanel />}

      <div className="chatWindow">
        {/* Chat header */}
        <div
          className="chatWindow__header"
          onClick={() => setToggleChatDetails(!toggleChatDetails)}
        >
          <div className="chatWindow__header_left">
            <Avatar avatar="http://placehold.it/40x40" />
            <div className="chatWindow__header_info">
              <h3 className="chatWindow__header_name">{currentChannel.name}</h3>
              {messages[messages.length - 1] && (
                <p className="chatWindow__header_status">
                  Last message...
                  {new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                  ).toUTCString()}
                </p>
              )}
            </div>
          </div>
          <div className="chatWindow__header__right">
            <IconButton icon="icon-search" />
          </div>
        </div>

        {/* Chat body */}
        <div className="chatWindow__body">
          {messages.length > 0 &&
            messages.map((msg) => (
              <div
                key={msg.name}
                className={`chat__message ${
                  msg.name === user.displayName && "chat__receiver"
                }`}
              >
                <span className="chat__name">{msg.name}</span>
                {isImage(msg) ? (
                  <img src={msg.image} alt="an image" />
                ) : (
                  msg.message
                )}
                <span className="chat__timestamp">
                  {new Date(msg.timestamp?.toDate()).toUTCString()}
                </span>
              </div>
            ))}
        </div>

        {/* Chat footer */}
        <ChatFooter channelID={currentChannel.id} />
      </div>

      {/* Chat details panel */}
      {toggleChatDetails && (
        <ChatDetails channel={currentChannel} currMsgs={messages} user={user} />
      )}

      {/* User details panel */}
      {/* {toggleChatDetails && <UserDetails />} */}
    </>
  );
};

export default ChatWindow;
