import React, { useEffect, useState } from "react";

import firebase from "firebase";

import { SearchField } from "../../elements";
import ChannelLink from "../channelLink/ChannelLink";
import "./allChannelsPanel.scss";

import db from "../../../firebase";

const channels = [
  {
    id: 0,
    name: "Assasin's Creed",
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

const AllChanelsPanel = () => {
  const [channelsRef, setChannels] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapShot) => {
      setChannels(
        snapShot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      console.log(channelsRef);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="all_channels_panel">
      <SearchField />
      <div className="channels_area">
        {channelsRef.map((ch) => (
          <ChannelLink key={ch.id} channelId={ch.id} info={ch.data} />
        ))}
      </div>
    </div>
  );
};

export default AllChanelsPanel;
