import React from "react";
import moment from "moment";

//-- Components
import { MenuButton } from "./../../elements";
import AvatarDetails from "../avatarDetails/AvatarDetails";

//-- Stylesheet
import "./chatDetails.scss";
import UserGroup from "../../elements/userGroup/UserGroup";

const userControls = [
  {
    id: 0,
    label: "Mute notifications",
    icon: "bell-off-empty",
  },
  {
    id: 1,
    label: "Favourite",
    icon: "star-empty-1",
  },
];

const adminControls = [
  {
    id: 0,
    label: "Make Admin",
    icon: "users",
  },
  {
    id: 1,
    label: "Ban user",
    icon: "cancel-circled",
  },
  {
    id: 2,
    label: "Delete room",
    icon: "trash-1",
  },
];

const index = ({ channel, currMsgs, user }) => {
  return (
    <div className="chatwindow__details">
      <h2 className="section__title sideBar__title">Channel information</h2>

      {/* Header */}
      <div className="chatwindow__details_header">
        <AvatarDetails
          image="http://placehold.it/86x86"
          name={channel.name}
          size="lrg"
        />
        <UserGroup messages={currMsgs} />
      </div>

      {/* Room details */}
      <div className="chatwindow__details_section">
        <span className="section__title">Author</span>
        <p className="chatwindow__info">{channel.createdBy}</p>
        <span className="section__title">Created on</span>
        <p className="chatwindow__info">
          {moment(channel.createdAt.toDate()).format("dddd MMMM Do YYYY")}
        </p>
      </div>

      {/* description */}
      <div className="chatwindow__details_section">
        <span className="section__title">Room info</span>
        <p className="chatwindow__info">{channel.description}</p>
      </div>

      {/* User controls */}
      <div className="chatwindow__details_section user_controls">
        {userControls.map((ctrl) => (
          <MenuButton
            key={ctrl.label}
            label={ctrl.label}
            icon={`icon-${ctrl.icon}`}
          />
        ))}
      </div>

      {/* Admin controls */}
      {user.uid === channel.adminId && (
        <div className="chatwindow__details_section admin_section">
          <span className="section__title">Admin</span>
          {adminControls.map((ctrl) => (
            <MenuButton
              key={ctrl.label}
              label={ctrl.label}
              icon={`icon-${ctrl.icon}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default index;
