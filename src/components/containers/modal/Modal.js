/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const element = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(element).classList.add("overlay");
    modalRoot.style.zIndex = "99";

    return () => {
      modalRoot.removeChild(element);
      modalRoot.style.zIndex = "-1";
    };
  }, []);

  return createPortal(children, element);
};

export default Modal;
