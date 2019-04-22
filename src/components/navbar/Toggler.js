import React, { Component } from "react";
import "./toggler.css";

export default function Toggler(props) {
  const { isExpanded, clickHandler, className } = props;
  return (
    <div onClick={clickHandler} className={`toggler ${className}`}>
      <span
        className={`toggler-icon ${isExpanded ? "toggler-icon-expanded" : ""}`}
      />
    </div>
  );
}
