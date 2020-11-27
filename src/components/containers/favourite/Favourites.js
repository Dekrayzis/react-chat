import React, { useState, useEffect } from "react";

//-- Elements
import ChannelLink from "../channelLink/ChannelLink";
import { ToggleButton } from "../../elements";

import { useStateValue } from "../../../context/StateProvider";
import db from "../../../firebase";

const Favourites = () => {
  const [{ user, currentChannel, showAllChannels }, dispatch] = useStateValue();
  const [activeChannel, setActiveChannel] = useState("");
  const [favouritesList, setFavouritesList] = useState([]);

  const usersRef = db.collection("users").doc(user.uid);
  const userFavouritesList = usersRef.collection("favourites");

  const changeChannel = (channel) => {
    setActiveChannel(channel);
    dispatch({
      type: "SET_CURRENT_CHANNEL",
      currentChannel: channel,
    });
    dispatch({
      type: "SET_PRIVATE_CHANNEL",
      isPrivateChannel: false,
    });
  };

  const displayChannels = () => {
    return (
      favouritesList.length > 0 &&
      favouritesList.map((channel) => (
        <ChannelLink
          key={`user-${channel.id}`}
          channelId={channel.id}
          info={channel}
          onClick={() => changeChannel(channel)}
          active={channel.id === activeChannel}
        />
      ))
    );
  };

  useEffect(() => {
    const addUserFavouritesListener = async () => {
      const favourites_ref = await userFavouritesList.get();
      let tempList = [];
      //-- Retrieve favourite channels
      favourites_ref.forEach((doc) => {
        tempList.push(doc.data());
      });

      setFavouritesList(tempList);
    };
    addUserFavouritesListener();
    return () => {
      addUserFavouritesListener();
    };
  }, [user]);

  useEffect(() => {}, [activeChannel]);

  return (
    <div className="sidebar_panel">
      <div className="sidebar_panel__header_title">
        <div className="sidebar_panel__header_left">
          <span className="sidebar_panel_title">
            Favourites{" "}
            <span className="title_counter">({favouritesList.length})</span>
          </span>
        </div>
        <div className="sidebar_panel__header_right">
          <ToggleButton
            label="See all"
            icon="right-open-1"
            // onClick={toggle_allchannels}
          />
        </div>
      </div>
      <div className="sidebar_panel_area">{displayChannels()}</div>
    </div>
  );
};

export default Favourites;
