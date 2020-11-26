/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import firebase from "firebase";

import ToggleButton from "../../elements/buttons/ToggleButton";
import ChannelLink from "../channelLink/ChannelLink";
import { useStateValue } from "../../../context/StateProvider";

import db from "../../../firebase";

//-- Stylesheet
import "../sidebarPanel/sidebarPanel.scss";

// const channels = [
//   {
//     id: 0,
//     name: "Assassin's Creed",
//     status: "online",
//     user: true,
//   },
//   {
//     id: 1,
//     name: "Design",
//     status: "away",
//   },
//   {
//     id: 2,
//     name: "Games",
//     status: "offline",
//     notifications: true,
//   },
// ];

const DirectMessages = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChannels_Panel, setShowAllChannels_Panel] = useState(true);

  const [users, setUsers] = useState([]);
  const usersRef = firebase.database().ref("users");
  const connectedRef = firebase.database().ref(".info/connected");
  const presenceRef = firebase.database().ref("presence");

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = users.reduce((acc, otherUser) => {
      if (otherUser.uid === userId) {
        otherUser["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(otherUser);
    }, []);
    setUsers(updatedUsers);
  };

  const changeChannel = (user) => {
    const channelId = getChannelId(user.uid);
    const channelData = {
      id: channelId,
      name: user.name,
    };

    dispatch({
      type: "SET_CURRENT_CHANNEL",
      currentChannel: channelData,
    }).then(() => {
      dispatch({
        type: "SET_PRIVATE_CHANNEL",
        isPrivateChannel: true,
      });
    });
  };

  const getChannelId = (userId) => {
    return userId < user.uid
      ? `${userId}/${user.uid}`
      : `${user.uid}/${userId}`;
  };

  useEffect(() => {
    const unsubscribe = usersRef.on("child_added", (snap) => {
      let loadedUsers = [];

      if (user.uid !== snap.key) {
        let diffUser = snap.val();
        diffUser["uid"] = snap.key;
        diffUser["status"] = "offline";

        loadedUsers.push(diffUser);
        setUsers(loadedUsers);
      }
    });

    const unsubConnected = connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = presenceRef.child(user.uid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          console.error(err);
        });
      }
    });

    const unsubUsersAdded = presenceRef.on("child_added", (snap) => {
      if (user.uid !== snap.key) {
        //-- add status to user
        addStatusToUser(snap.key);
      }
    });

    const unsubUsersRemoved = presenceRef.on("child_removed", (snap) => {
      if (user.uid !== snap.key) {
        //-- remove status to user
        addStatusToUser(snap.key, false);
      }
    });

    return () => {
      unsubscribe();
      unsubConnected();
      unsubUsersAdded();
      unsubUsersRemoved();
    };
  }, []);

  useEffect(() => {
    setShowAllChannels_Panel(!toggleChannels_Panel);
  }, [showAllChannels]);

  const toggle_allchannels = () => {
    dispatch({
      type: "SET_TOGGLE_ALL_CHANNELS",
      showAllChannels: !toggleChannels_Panel,
    });
  };

  return (
    <div className="sidebar_panel">
      <div className="sidebar_panel__header_title">
        <div className="sidebar_panel__header_left">
          <span className="sidebar_panel_title">
            Friends <span className="title_counter">(2)</span>
          </span>
        </div>
        <div className="sidebar_panel__header_right">
          <ToggleButton
            label="See all"
            icon="right-open-1"
            onClick={toggle_allchannels}
          />
        </div>
      </div>
      <div className="sidebar_panel_area">
        {users.map((otherUser) => (
          <ChannelLink
            key={`user-${otherUser.id}`}
            channelId={otherUser.id}
            info={otherUser.data}
            isUser
            directMsg={changeChannel(otherUser)}
          />
        ))}
      </div>
    </div>
  );
};

export default DirectMessages;
