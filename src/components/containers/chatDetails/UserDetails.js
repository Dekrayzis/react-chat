import React, { useEffect, useState } from "react";

//-- Components
import { MenuButton } from "../../elements";

//-- Stylesheet
import "./chatDetails.scss";
import AvatarDetails from "../avatarDetails/AvatarDetails";
import db from "./../../../firebase";

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

const UserDetails = ({ channel, selectedUser, user }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const adminControls = [
    {
      id: 0,
      label: "Block user",
      icon: "cancel-circled",
      isAdmin: user.uid === channel.adminId,
    },
    {
      id: 1,
      label: "Complain",
      icon: "thumbs-down",
      isAdmin: true,
    },
    {
      id: 2,
      label: "Delete chat",
      icon: "trash-1",
      isAdmin: false,
    },
  ];

  useEffect(() => {
    const addUserChangeListener = () => {
      db.collection("users")
        .doc(selectedUser)
        .get()
        .then(async (snap) => {
          const details = await snap.ref.get();
          setCurrentUser(details.data());
        });
    };
    addUserChangeListener();

    return () => {
      addUserChangeListener();
    };
  }, [selectedUser]);

  return (
    currentUser && (
      <>
        <div className="chatwindow__details">
          <h2 className="section__title sideBar__title">User information</h2>
          {/* Header */}
          <div className="chatwindow__details_header">
            <AvatarDetails
              image="http://placehold.it/86x86"
              name={currentUser.displayName}
              size="lrg"
            />
          </div>
          {/* Room details */}
          <div className="chatwindow__details_section">
            {/* phone */}
            {currentUser.showPhone && (
              <React.Fragment>
                <span className="section__title">Mobile</span>
                <p className="chatwindow__info">{currentUser.phone}</p>
              </React.Fragment>
            )}

            {/* email */}
            {currentUser.showEmail && (
              <React.Fragment>
                <span className="section__title">Email</span>
                <p className="chatwindow__info">{currentUser.email}</p>
              </React.Fragment>
            )}

            {/* birth date */}
            {currentUser.showBirthDate && (
              <React.Fragment>
                <span className="section__title">Birth date</span>
                <p className="chatwindow__info">{currentUser.birthDate}</p>
              </React.Fragment>
            )}

            {/* wesbite */}
            {currentUser.showWebsite && (
              <React.Fragment>
                <span className="section__title">Website</span>
                <p className="chatwindow__info">{currentUser.website}</p>
              </React.Fragment>
            )}
          </div>

          {/* status */}
          <div className="chatwindow__details_section">
            <span className="section__title">Status</span>
            <p className="chatwindow__info">{currentUser.status}</p>
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
            {adminControls.map((ctrl) => {
              return ctrl.isAdmin ? (
                <MenuButton
                  key={ctrl.label}
                  label={ctrl.label}
                  icon={`icon-${ctrl.icon}`}
                />
              ) : null;
            })}
          </div>
        </div>
      </>
    )
  );
};

export default UserDetails;
