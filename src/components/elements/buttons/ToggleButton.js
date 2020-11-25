import React from "react";
import "./buttons.scss";

const ToggleButton = ({ label, icon }) => {
  return (
    <button className="btn-toggle">
      {label} <i className={`demo-icon icon-${icon}`} />
    </button>
  );
};

export default ToggleButton;
