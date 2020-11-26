/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import ChannelLink from "../channelLink/ChannelLink";
import { useStateValue } from "../../../context/StateProvider";
import "./allChannelsPanel.scss";

import db from "../../../firebase";

const AllChanelsPanel = () => {
  const [{ user }] = useStateValue();
  const [channelsRef, setChannels] = useState([]);
  const [search_results, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      //-- Obtain list of available chat rooms/ filter rooms by ban list.
      const unsubscribe = db.collection("rooms").onSnapshot((snapShot) => {
        let channels = [];
        snapShot.docs.forEach((doc) => {
          //-- Check if user is on the ban list
          const isOnBanArr = doc
            .data()
            .banList.filter((name) => name.includes(user.uid));
          if (isOnBanArr.length === 0) {
            channels.push({
              id: doc.id,
              data: doc.data(),
            });
          }
        });
        setChannels(channels);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

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
    setLoading(false);
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
