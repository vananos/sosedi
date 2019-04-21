import React, { Component } from "react";
import "./toggler.css";

export default function Toggler(props) {
  const { isExpanded, clickHandler } = props;
  return (
    <div className="toggler" onClick={clickHandler}>
      <span
        className={`toggler-icon ${isExpanded ? "toggler-icon-expanded" : ""}`}
      />
    </div>
  );
}
