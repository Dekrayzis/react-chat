import React from "react";
import "./buttons.scss";

const IconButton = ({ icon, label, onClick }) => {
  return (
    <>
      <button className="btn" onClick={onClick}>
        {label && <span className="label">{label}</span>}
        <i className={`demo-icon ${icon}`} />
      </button>
    </>
  );
};

export default IconButton;
