import React from "react";
import PropTypes from "prop-types";
import "./Notification.scss";
import NotificationManager from "../NotificationManager/NotificationManager";

export default function Notification(props) {
  const { msg, type, onClick } = props;
  return (
    <div
      onClick={e => onClick(e)}
      className={`notification notification-${type}`}
    >
      {msg}
    </div>
  );
}

Notification.defaultProps = {
  type: "success"
};

Notification.propTypes = {
  msg: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["success", "error"])
};
