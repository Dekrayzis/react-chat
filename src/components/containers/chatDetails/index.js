/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";

//-- Components
import { MenuButton, Toast } from "./../../elements";
import AvatarDetails from "../avatarDetails/AvatarDetails";

import UserGroup from "../../elements/userGroup/UserGroup";
import db from "./../../../firebase";

//-- Stylesheet
import "./chatDetails.scss";

const ChannelDetails = ({ channel, currMsgs, user }) => {
  const [isChannelStarred, setChannelStarred] = useState(false);
  const [muteNotifications, setMuteNotifications] = useState(false);
  const [toastMessage, setToastMessage] = useState([]);

  const usersRef = db.collection("users").doc(user.uid);

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
      func: () => {
        db.collection("rooms")
          .doc(channel.id)
          .delete()
          .then(() => {
            setToastMessage([
              {
                id: 0,
                title: "Success",
                description: "Channel successfully deleted!",
                backgroundColor: "#5cb85c",
                icon: "success",
              },
            ]);
          })
          .catch((err) => {
            console.error("Error removing document: ", err);
            setToastMessage([
              {
                id: 0,
                title: "Error",
                description: err,
                backgroundColor: "#5cb85c",
                icon: "success",
              },
            ]);
          });
      },
    },
  ];

  const userControls = [
    {
      id: 0,
      label: "Mute notifications",
      icon: muteNotifications ? "bell-off" : "bell-off-empty",
      func: () => setMuteNotifications(!muteNotifications),
    },
    {
      id: 1,
      label: "Favourite",
      icon: isChannelStarred ? "star-2" : "star-empty-1",
      altIcon: "star-2",
      func: () => star_channel(),
    },
  ];

  useEffect(() => {
    const addUserFavouritesListener = (channelId) => {
      usersRef
        .collection("favourites")
        .where("id", "==", channelId)
        .get()
        .then((snap) => {
          if (!snap.empty) {
            setChannelStarred(true);
          } else {
            setChannelStarred(false);
          }
        });
    };
    addUserFavouritesListener(channel.id, user.uid);

    const addMuteNotificationListener = (channelId) => {
      usersRef
        .collection("notifications")
        .where("id", "==", channelId)
        .get()
        .then((snap) => {
          if (!snap.empty) {
            setMuteNotifications(snap.docs[0].data().mute);
          }
        });
    };
    addUserFavouritesListener(channel.id);
    addMuteNotificationListener(channel.id);

    return () => {
      addUserFavouritesListener(channel.id);
      addMuteNotificationListener(channel.id);
    };
  }, [channel.id]);

  const star_channel = async () => {
    const userFavouritesList = usersRef.collection("favourites");

    if (!isChannelStarred) {
      // Does channel already exist?
      const query = userFavouritesList.where("id", "==", channel.id);
      query.get().then((snap) => {
        if (snap.empty) {
          //-- Create channel notification
          userFavouritesList
            .add({
              id: channel.id,
              name: channel.name,
              description: channel.description,
            })
            .then(() => {
              setToastMessage([
                {
                  id: 0,
                  title: "Success",
                  description: "Channel added to favourites!",
                  backgroundColor: "#5cb85c",
                  icon: "success",
                },
              ]);
              setChannelStarred(true);
            });
        }
      });
    } else {
      const favourites_ref = await userFavouritesList.get();
      favourites_ref.forEach((doc) => {
        //-- Update existing value to false
        if (doc.data().id === channel.id) {
          doc.ref
            .delete()
            .then(() => {
              setToastMessage([
                {
                  id: 0,
                  title: "Success",
                  description: "Channel removed from favourites!",
                  backgroundColor: "#5cb85c",
                  icon: "success",
                },
              ]);
              setChannelStarred(false);
            })
            .catch((err) => {
              console.error("Error removing channel from favourites: ", err);
              setToastMessage([
                {
                  id: 0,
                  title: "Error",
                  description: err,
                  backgroundColor: "#5cb85c",
                  icon: "success",
                },
              ]);
            });
        }
      });
    }
  };

  //-- Mute channel notifications
  useEffect(() => {
    mute_channel();
  }, [muteNotifications]);

  const mute_channel = async () => {
    const userNotificationsList = usersRef.collection("notifications");
    const notifications_ref = await userNotificationsList.get();

    if (muteNotifications) {
      // Does channel already exist?
      const query = userNotificationsList.where("id", "==", channel.id);
      query.get().then((snap) => {
        if (snap.empty) {
          //-- Create channel notification
          userNotificationsList.add({
            id: channel.id,
            name: channel.name,
            count: 0,
            mute: true,
          });
        } else {
          //-- Update existing value
          snap.forEach((doc) => {
            if (doc.data().id === channel.id) {
              doc.ref.set(
                {
                  mute: true,
                },
                { merge: true }
              );
            }
          });
        }
      });
    } else {
      notifications_ref.forEach((doc) => {
        //-- Update existing value to false
        if (doc.data().id === channel.id) {
          doc.ref
            .set(
              {
                mute: false,
              },
              { merge: true }
            )
            .then(() => {
              setToastMessage([
                {
                  id: 0,
                  title: "Success",
                  description: "Notifications are enabled",
                  backgroundColor: "#5cb85c",
                  icon: "success",
                },
              ]);
            })
            .catch((err) => {
              console.error("Error removing channel notifications: ", err);
              setToastMessage([
                {
                  id: 0,
                  title: "Error",
                  description: err,
                  backgroundColor: "#5cb85c",
                  icon: "success",
                },
              ]);
            });
        }
      });
    }
  };

  return (
    <>
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
              onClick={ctrl.func}
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
                onClick={ctrl.func}
              />
            ))}
          </div>
        )}
      </div>
      <Toast
        toastList={toastMessage}
        position="bottom-right"
        autoDeleteTime={10000}
        autoDelete={false}
      />
    </>
  );
};

export default ChannelDetails;
