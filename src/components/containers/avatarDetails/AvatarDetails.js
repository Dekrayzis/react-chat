import React from "react";
import "./avatarDetails.scss";

const AvatarDetails = ({ image, size, name }) => {
  return (
    <div className="avatar_box">
      <div className={`avatar ${size}`}>
        <img src={image} alt="avatar" className={`avatar-img ${size}`} />
      </div>
      <span className="avatar_box_name">{name}</span>
    </div>
  );
};

export default AvatarDetails;
