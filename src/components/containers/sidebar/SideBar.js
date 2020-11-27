/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./sidebar.scss";

//-- Containers
import AvatarDetails from "./../avatarDetails/AvatarDetails";
import SidebarPanel from "../sidebarPanel/SidebarPanel";
import DirectMessages from "./../directMessages/DirectMessages";
import Favourites from "../favourite/Favourites";

//-- Elements
import { MenuButton } from "./../../elements";
import CreateChat from "../createChat/CreateChat";

import { useStateValue } from "../../../context/StateProvider";
import { auth } from "../../../firebase";

const currentYear = new Date().getFullYear();

const SideBar = () => {
  const [showModal, setToggleModal] = useState(false);
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [toggleChannels_Panel, setShowAllChannels_Panel] = useState(false);

  const toggle_allchannels = () => {
    setShowAllChannels_Panel(!toggleChannels_Panel);
    dispatch({
      type: "SET_TOGGLE_ALL_CHANNELS",
      showAllChannels: !toggleChannels_Panel,
    });
  };

  const mainMenu = [
    {
      id: 0,
      label: "New chat",
      icon: "chat-empty",
      func: () => {
        setToggleModal(true);
      },
    },
    {
      id: 1,
      label: "Chat rooms",
      icon: "users",
      func: () => toggle_allchannels(),
    },
    {
      id: 2,
      label: "Friends",
      icon: "users",
    },
    {
      id: 3,
      label: "Favourites",
      icon: "star-empty-1",
    },
    {
      id: 4,
      label: "Settings",
      icon: "cog-1",
    },
    {
      id: 5,
      label: "Log out",
      icon: "logout",
      func: () => {
        auth.signOut().then(() => console.log("signed out"));
      },
    },
  ];

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar__header">
          <AvatarDetails
            image={user.photoURL}
            name={user.displayName}
            size="lrg"
          />
        </div>

        <div className="sidebar__menu">
          {mainMenu.map((ctrl) => (
            <MenuButton
              key={`menu-0${ctrl.id}`}
              label={ctrl.label}
              icon={`icon-${ctrl.icon}`}
              onClick={ctrl.func}
            />
          ))}
        </div>
        {/* <SidebarPanel /> */}
        <DirectMessages />
        <Favourites />
        <span className="copyright">&copy; {currentYear} Vicenco inc </span>
      </aside>
      {showModal ? (
        <CreateChat
          user={user}
          closeModal={() => setToggleModal(!showModal)}
          open={showModal}
        />
      ) : null}
    </>
  );
};

export default SideBar;
