import React, { useState } from "react";

//-- Elements
import ChannelLink from "../channelLink/ChannelLink";
import { ToggleButton } from "../../elements";

import { useStateValue } from "../../../context/StateProvider";

const Favourites = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [starredChannels, setStarredChannels] = useState(0);
  const [activeChannel, setActiveChannel] = useState("");

  const changeChannel = (channel) => {
    setActiveChannel(channel);
    dispatch({
      type: "SET_CURRENT_CHANNEL",
      currentChannel: channel,
    }).then(() => {
      dispatch({
        type: "SET_PRIVATE_CHANNEL",
        isPrivateChannel: false,
      });
    });
  };

  const displayChannels = (starredChannels) => {
    starredChannels.length > 0 &&
      starredChannels.map((channel) => (
        <ChannelLink
          key={`user-${channel.id}`}
          channelId={channel.id}
          info={channel.data}
          onClick={changeChannel(channel)}
          active={channel.id === activeChannel}
        />
      ));
  };

  return (
    <div className="sidebar_panel">
      <div className="sidebar_panel__header_title">
        <div className="sidebar_panel__header_left">
          <span className="sidebar_panel_title">
            Favourites <span className="title_counter">(0)</span>
          </span>
        </div>
        <div className="sidebar_panel__header_right">
          <ToggleButton
            label="See all"
            icon="right-open-1"
            // onClick={toggle_allchannels}
          />
        </div>
      </div>
      <div className="sidebar_panel_area">{displayChannels}</div>
    </div>
  );
};

export default Favourites;
