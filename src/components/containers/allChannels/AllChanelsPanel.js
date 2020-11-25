import React from "react";
import { SearchField } from "../../elements";
import ChannelLink from "../channelLink/ChannelLink";
import "./allChannelsPanel.scss";

const channels = [
  {
    id: 0,
    name: "Assasin's Creed",
    status: "online",
    user: true,
  },
  {
    id: 1,
    name: "Design",
    status: "away",
  },
  {
    id: 2,
    name: "Games",
    status: "offline",
    notifications: true,
  },
];

const AllChanelsPanel = () => {
  return (
    <div className="all_channels_panel">
      <SearchField />
      <div className="channels_area">
        {channels.map((ch) => (
          <ChannelLink key={ch.id} info={ch} />
        ))}
      </div>
    </div>
  );
};

export default AllChanelsPanel;
