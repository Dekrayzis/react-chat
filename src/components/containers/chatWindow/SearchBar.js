/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IconButton } from "../../elements";
import "./searchBar.scss";

const SearchBar = ({ messages, toggle, closeModal, resultsCallback }) => {
  const [search_results, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //-- Search messages
  const handleSearchMsgs = () => {
    const allMessages = [...messages];
    const regex = new RegExp(searchTerm, "gi");

    const searchResults = allMessages.reduce((acc, chan) => {
      if (chan && chan.message && chan.message.match(regex)) {
        acc.push(chan);
      }
      return acc;
    }, []);

    setSearchResults(searchResults);
  };

  const handleSearchChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearchMsgs();
    }

    return () => {
      // setSearchTerm("");
    };
  }, [searchTerm]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (search_results.length > 0) {
      resultsCallback({ results: search_results, query: searchTerm });
    }
  };

  return (
    <div
      className={toggle ? "search_bar_container open" : "search_bar_container"}
    >
      <div className="form-group">
        <form onSubmit={onSubmit}>
          <input
            placeholder="Search messages..."
            type="text"
            onChange={(ev) => handleSearchChange(ev)}
          />
        </form>
      </div>

      <IconButton icon="icon-cancel" onClick={closeModal} />
    </div>
  );
};

export default SearchBar;
