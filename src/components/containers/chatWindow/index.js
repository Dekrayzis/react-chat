import React from "react";

//-- Elements
import Avatar from "./../../elements/Avatar/Avatar";
import IconButton from "./../../elements/buttons/IconButton";

//-- Containers
import ChatDetails from "../chatDetails";
import UserDetails from "../chatDetails/UserDetails";
import AllChanelsPanel from "../allChannels/AllChanelsPanel";

//-- Styles
import "./chatWindow.scss";

const ChatWindow = () => {
  return (
    <>
      {/* All channels panel */}
      <AllChanelsPanel />

      <div className="chatWindow">
        {/* Chat header */}
        <div className="chatWindow__header">
          <div className="chatWindow__header_left">
            <Avatar avatar="http://placehold.it/40x40" />
            <div className="chatWindow__header_info">
              <h3 className="chatWindow__header_name">Chat name</h3>
              <p className="chatWindow__header_status">Last message...</p>
            </div>
          </div>
          <div className="chatWindow__header__right">
            <IconButton icon="icon-search" />
          </div>
        </div>

        {/* Chat body */}
        <div className="chatWindow__body"></div>

        {/* Chat footer */}
        <div className="chatWindow__footer">
          <IconButton icon="icon-emo-happy" />
          <form action="/">
            <input type="text" placeholder="Type a message" value="" />
            <button type="submit">Send message</button>
          </form>
          <IconButton icon="icon-attach" />
        </div>
      </div>

      {/* Chat details panel */}
      <ChatDetails />

      {/* User details panel */}
      <UserDetails />
    </>
  );
};

export default ChatWindow;
