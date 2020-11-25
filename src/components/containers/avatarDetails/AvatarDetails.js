import React from "react";
import "./avatarDetails.scss";

const AvatarDetails = ({ user, size }) => {
  return (
    <div className="avatar_box">
      <div className={`avatar ${size}`}>
        <img
          src={user.photoURL}
          alt="avatar"
          className={`avatar-img ${size}`}
        />
      </div>
      <span className="avatar_box_name">{user.displayName}</span>
    </div>
  );
};

export default AvatarDetails;
