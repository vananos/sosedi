import "./Modal.scss";

import React from "react";

export default function Modal(props) {
  const { display, children, onClick } = { ...props };
  return (
    <div
      className="modal"
      onClick={onClick}
      style={{ display: display ? "flex" : "none" }}
    >
      {children}
    </div>
  );
}
