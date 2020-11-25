import React from "react";

//-- Components
import { MenuButton } from "../../elements";

//-- Stylesheet
import "./chatDetails.scss";
import AvatarDetails from "../avatarDetails/AvatarDetails";

const userInfo = {
  name: "Mads Olav Nesje",
  phone: "+90 532 324 43 23",
  email: "kahr@gmail.com",
  birthDate: "23.04.1985",
  createdAt: new Date(),
  description: "Lorum ipsum consecture elit disset aram",
  displayName: "Kahr",
  photoURL: "http://placehold.it/80x80",
};

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
    label: "Block user",
    icon: "cancel-circled",
  },
  {
    id: 1,
    label: "Complain",
    icon: "thumbs-down",
  },
  {
    id: 2,
    label: "Delete chat",
    icon: "trash-1",
  },
];
const index = () => {
  return (
    <div className="chatwindow__details">
      <h2 className="section__title sideBar__title">User information</h2>
      {/* Header */}
      <div className="chatwindow__details_header">
        <AvatarDetails user={userInfo} size="lrg" />
      </div>
      {/* Room details */}
      <div className="chatwindow__details_section">
        <span className="section__title">Mobile</span>
        <p className="chatwindow__info">{userInfo.phone}</p>
        <span className="section__title">Email</span>
        <p className="chatwindow__info">{userInfo.email}</p>
        <span className="section__title">Birthday</span>
        <p className="chatwindow__info">{userInfo.birthDate}</p>
      </div>
      {/* description */}
      <div className="chatwindow__details_section">
        <span className="section__title">Status</span>
        <p className="chatwindow__info">{userInfo.description}</p>
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
        {adminControls.map((ctrl) => (
          <MenuButton
            key={ctrl.label}
            label={ctrl.label}
            icon={`icon-${ctrl.icon}`}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
