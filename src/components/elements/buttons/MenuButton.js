import React from "react";

const MenuButton = ({ label, icon, onClick }) => {
  return (
    <button className="menuBtn" onClick={onClick}>
      <i className={`demo-icon ${icon}`} />
      <span className="label">{label}</span>
    </button>
  );
};

export default MenuButton;
