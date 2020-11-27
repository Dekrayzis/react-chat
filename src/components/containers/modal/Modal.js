/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

const Modal = ({ children, onClose, open }) => {
  const modalElement = document.getElementById("modal");

  useEffect(() => {
    modalElement.classList.add("overlay");
    modalElement.style.zIndex = "99";

    return () => {
      modalElement.style.zIndex = "-1";
    };
  }, []);

  return open
    ? createPortal(
        <div className="modal">{children}</div>,
        document.getElementById("modal")
      )
    : null;
};
export default Modal;
