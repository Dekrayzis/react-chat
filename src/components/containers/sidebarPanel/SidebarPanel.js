import React, { useEffect, useState } from "react";
import ToggleButton from "../../elements/buttons/ToggleButton";
import ChannelLink from "../channelLink/ChannelLink";
import { useStateValue } from "../../../context/StateProvider";

import db from "../../../firebase";

//-- Stylesheet
import "./sidebarPanel.scss";

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

const SidebarPanel = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChannels_Panel, setShowAllChannels_Panel] = useState(true);

  const [channelsRef, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapShot) => {
      setChannels(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log(channelsRef);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setShowAllChannels_Panel(!toggleChannels_Panel);
  }, [showAllChannels]);

  const toggle_allchannels = () => {
    console.log("hit");
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
            Chats <span className="title_counter">(6)</span>
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
        {/* {channelsRef.map((ch) => (
          <ChannelLink key={ch.id} channelId={ch.id} info={ch.data} />
        ))} */}
      </div>
    </div>
  );
};

export default SidebarPanel;
