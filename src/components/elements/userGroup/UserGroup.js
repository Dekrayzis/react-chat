import React, { useState, useEffect } from "react";
import { getUniqueListBy } from "../../../helpers/util";
import "./usergroup.scss";

const UserGroup = ({ messages }) => {
  const [uniqueUsers, setUniqueUsers] = useState([]);

  const showUniqueUsers = (messages) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes("message.name")) {
        acc.push(message.name);
      }
      return acc;
    }, []);

    const currUniqueUsers = getUniqueListBy(uniqueUsers, "name");
    setUniqueUsers(
      `${currUniqueUsers.length} ${
        currUniqueUsers.length > 1 ? "users" : "user"
      }`
    );
  };

  useEffect(() => {
    showUniqueUsers(messages);
  }, [messages]);

  return (
    <div className="userGroup">
      <div className="avatars">
        <span className="user_avatar">
          <img src="https://picsum.photos/70" />
        </span>
        <span className="user_avatar">
          <img src="https://picsum.photos/80" />
        </span>
        <span className="user_avatar">
          <img src="https://picsum.photos/90" />
        </span>
        <span className="user_avatar">
          <img src="https://picsum.photos/100" />
        </span>
      </div>
      {/* <div className="userCount">{`${count - 4 > 0 ? "+" : ""} ${
        count - 4
      } user${count - 4 > 1 ? "s" : ""}`}</div> */}
      <div className="userCount">{uniqueUsers}</div>
    </div>
  );
};

export default UserGroup;
