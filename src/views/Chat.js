import React from "react";

//-- Containers
import ChatWindow from "../components/containers/chatWindow";
import SideBar from "../components/containers/sidebar/SideBar";

const Chat = () => {
  return (
    <>
      <div className="app__body">
        <SideBar />
        <ChatWindow />
      </div>
    </>
  );
};

export default Chat;
