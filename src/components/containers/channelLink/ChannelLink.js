import React from "react";
import { Avatar } from "./../../elements";
import "./channelLink.scss";

const ChannelLink = ({ info, status }) => {
  return (
    <div className="channel_link">
      <div className="channel_link_left">
        <Avatar avatar="http://placehold.it/40x40" />
        <div className="channel_link_info">
          <h3 className="channel_link_name">{info.name}</h3>
          <p className="channel_link_msg">Last message...</p>
        </div>
      </div>
      <div className="channel_link__right">
        {info.user ? (
          <div className={`userStatus status-${info.status}`}>
            {info.status}
          </div>
        ) : (
          <div className="channel_link__info">
            {info.notifications ? (
              <div className="notification">
                <span className="count">2</span>
              </div>
            ) : null}
            <span className="timestamp">17:53</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelLink;
