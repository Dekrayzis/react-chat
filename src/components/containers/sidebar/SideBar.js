import React, { useState } from "react";
import "./sidebar.scss";
import AvatarDetails from "./../avatarDetails/AvatarDetails";
import { MenuButton, IconButton } from "./../../elements";
import SidebarPanel from "../sidebarPanel/SidebarPanel";
import { useStateValue } from "../../../context/StateProvider";

import { auth } from "../../../firebase";
import CreateChat from "../createChat/CreateChat";

const currentYear = new Date().getFullYear();

const SideBar = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [showModal, setToggleModal] = useState(false);

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
      label: "New group",
      icon: "users",
    },
    {
      id: 2,
      label: "Friends",
      icon: "users",
    },
    {
      id: 2,
      label: "Favourites",
      icon: "heart-empty-1",
    },
    {
      id: 2,
      label: "Settings",
      icon: "cog-1",
    },
    {
      id: 2,
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
              label={ctrl.label}
              icon={`icon-${ctrl.icon}`}
              onClick={ctrl.func}
            />
          ))}
        </div>
        <SidebarPanel />
        <span className="copyright">&copy; {currentYear} Vicenco inc </span>
      </aside>
      {showModal ? (
        <CreateChat user={user} closeModal={() => setToggleModal(!showModal)} />
      ) : null}
    </>
  );
};

export default SideBar;
