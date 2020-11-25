import React from "react";
import "./sidebarPanel.scss";
import ToggleButton from "../../elements/buttons/ToggleButton";
import ChannelLink from "../channelLink/ChannelLink";

const channels = [
  {
    id: 0,
    name: "Assassin's Creed",
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

const SidebarPanel = () => {
  return (
    <div className="sidebar_panel">
      <div className="sidebar_panel__header_title">
        <div className="sidebar_panel__header_left">
          <span className="sidebar_panel_title">
            Chats <span className="title_counter">(6)</span>
          </span>
        </div>
        <div className="sidebar_panel__header_right">
          <ToggleButton label="See all" icon="right-open-1" />
        </div>
      </div>
      <div className="sidebar_panel_area">
        {channels.map((ch) => (
          <ChannelLink key={ch.id} info={ch} />
        ))}
      </div>
    </div>
  );
};

export default SidebarPanel;
