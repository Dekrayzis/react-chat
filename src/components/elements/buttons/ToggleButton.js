import React from "react";
import "./buttons.scss";

const ToggleButton = ({ label, icon, onClick }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {label} <i className={`demo-icon icon-${icon}`} />
    </button>
  );
};

export default ToggleButton;
