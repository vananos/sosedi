import React, { Component } from "react";
import "./Notification.scss";

export default function Notification(props) {
  const { msg, type } = props;
  return (
    <div
      onClick={e => props.callback()}
      className={`notification notification-${type}`}
    >
      {msg}
    </div>
  );
}
