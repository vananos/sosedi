import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Popup.scss";
import Modal from "../Modal/Modal";

export default function Popup(props) {
  const { children, onCloseHandler } = props;

  const effectiveCloseHandler = e => {
    Modal.hide();
    onCloseHandler && onCloseHandler(e);
  };

  return (
    <div className="popup">
      <svg
        className="popup-close"
        width="20"
        height="20"
        onClick={effectiveCloseHandler}
      >
        <line x1="0" y1="0" x2="20" y2="20" className="popup-close-line" />
        <line x1="20" y1="0" x2="0" y2="20" className="popup-close-line" />
      </svg>
      {children}
    </div>
  );
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseHandler: PropTypes.func
};
