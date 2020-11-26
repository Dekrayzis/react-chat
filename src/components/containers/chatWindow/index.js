/* eslint-disable jsx-a11y/img-redundant-alt */
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
import SearchBar from "./SearchBar";

const initialSearchState = {
  results: [],
  query: "",
};
const ChatWindow = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChatDetails, setToggleChatDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState(initialSearchState);

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

  const toggleSearchModal = (evt) => {
    evt.preventDefault();
    setSearchModal(!searchModal);
  };

  const renderMessages = () => {
    const { results, query } = searchResults;
    if (query !== "" && results.length !== 0) {
      return results.map((ch) =>
        // Display search results
        renderMsgs(results)
      );
    } else if (query !== "" && results.length === 0) {
      // Display no results
      return <span className="noResults_msg">No results</span>;
    } else {
      // Display all messages
      return messages.length > 0 && renderMsgs(messages);
    }
  };

  const renderMsgs = (arr) => {
    return arr.map((msg, idx) => (
      <div
        key={`result-msg-${idx}`}
        className={`chat__message ${
          msg.name === user.displayName && "chat__receiver"
        }`}
      >
        <span className="chat__name">{msg.name}</span>
        {isImage(msg) ? <img src={msg.image} alt="an image" /> : msg.message}
        <span className="chat__timestamp">
          {new Date(msg.timestamp?.toDate()).toUTCString()}
        </span>
      </div>
    ));
  };

  const resultsCallback = (res) => {
    setSearchResults(res);
  };

  useEffect(() => {
    return () => {
      setSearchResults(initialSearchState);
      setSearchModal(false);
    };
  }, [messages]);

  useEffect(() => {
    if (searchResults.query !== "") {
      renderMessages();
    }
  }, [searchResults]);

  return (
    <>
      {/* All channels panel */}
      {showAllChannels && <AllChanelsPanel />}

      <div className="chatWindow">
        {/* Chat header */}
        <div className="chatWindow__header">
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
            <IconButton
              icon="icon-search"
              onClick={(evt) => toggleSearchModal(evt)}
            />
            <IconButton
              icon="icon-dot-3"
              onClick={() => setToggleChatDetails(!toggleChatDetails)}
            />
          </div>

          {searchModal && (
            <SearchBar
              messages={messages}
              toggle={searchModal}
              closeModal={toggleSearchModal}
              resultsCallback={resultsCallback}
            />
          )}
        </div>

        {/* Chat body */}
        <div className="chatWindow__body">{renderMessages()}</div>

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
