/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import firebase from "firebase";

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
  const [search_results, setSearchResults] = useState([]);
  const [channelsRef, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSearchChange = (evt) => {
    setLoading(true);
    setSearchTerm(evt.target.value);
  };

  const handleSearchChannels = () => {
    const allChannels = [...channelsRef];
    const regex = new RegExp(searchTerm, "gi");

    const searchResults = allChannels.reduce((acc, chan) => {
      if (chan.data && chan.data.name.match(regex)) {
        acc.push(chan);
      }
      return acc;
    }, []);

    setSearchResults(searchResults);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearchChannels();
    }
  }, [searchTerm]);

  const renderChannels = () => {
    if (searchTerm !== "" && search_results.length !== 0) {
      return search_results.map((ch) => (
        // Display search results
        <ChannelLink key={ch.id} channelId={ch.id} info={ch.data} />
      ));
    } else if (searchTerm !== "" && search_results.length === 0) {
      // Display no results
      return <span className="noResults_msg">No results</span>;
    } else {
      // Display all channels
      return channelsRef.map((ch) => (
        <ChannelLink key={ch.id} channelId={ch.id} info={ch.data} />
      ));
    }
  };

  return (
    <div className="all_channels_panel">
      <div className="form-group">
        <input
          placeholder="Search channels by name..."
          type="text"
          onChange={(ev) => handleSearchChange(ev)}
        />
      </div>
      <div className="channels_area">{renderChannels()}</div>
    </div>
  );
};

export default AllChanelsPanel;
