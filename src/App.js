import React from "react";

//-- Components
import SideBar from "./components/containers/sidebar/SideBar";

//-- Stylesheet
import "./styles/app.scss";
import ChatWindow from "./components/containers/chatWindow";

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <SideBar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default App;
