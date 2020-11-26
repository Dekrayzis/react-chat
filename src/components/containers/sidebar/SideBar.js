import React, { useState } from "react";
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
  const [{ user }] = useStateValue();
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
      label: "Chat rooms",
      icon: "users",
    },
    {
      id: 2,
      label: "Friends",
      icon: "users",
    },
    {
      id: 3,
      label: "Favourites",
      icon: "heart-empty-1",
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
        <span className="copyright">&copy; {currentYear} Vicenco inc </span>
      </aside>
      {showModal ? (
        <CreateChat user={user} closeModal={() => setToggleModal(!showModal)} />
      ) : null}
    </>
  );
};

export default SideBar;
