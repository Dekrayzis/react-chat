import React, { useState } from "react";

//-- Elements
import Avatar from "./../../elements/Avatar/Avatar";
import IconButton from "./../../elements/buttons/IconButton";

//-- Containers
import ChatDetails from "../chatDetails";
import AllChanelsPanel from "../allChannels/AllChanelsPanel";
// import UserDetails from "../chatDetails/UserDetails";

import { useStateValue } from "../../../context/StateProvider";

//-- Styles
import "./chatWindow.scss";
import ChatFooter from "./ChatFooter";

const ChatWindow = () => {
  const roomId = "0Fn6eCJPtLPNxJ3emDZd"; // asssasins creed room
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChatDetails, setToggleChatDetails] = useState(false);

  //-- Messages
  const [messages, setMessages] = useState([]);

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
        <div className="chatWindow__body"></div>

        {/* Chat footer */}
        <ChatFooter channelID={roomId} />
      </div>

      {/* Chat details panel */}
      {toggleChatDetails && <ChatDetails />}

      {/* User details panel */}
      {/* {toggleChatDetails && <UserDetails />} */}
    </>
  );
};

export default ChatWindow;
