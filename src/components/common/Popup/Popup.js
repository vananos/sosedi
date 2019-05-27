import React, { Component } from "react";
import "./Popup.scss";

export default function Popup(props) {
  const { children, closeHandler } = props;
  return <div className="popup">{children}</div>;
}
