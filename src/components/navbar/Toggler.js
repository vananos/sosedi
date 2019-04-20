import React, { Component } from "react";
import "./toggler.css";

export default function Toggler(props) {
  const { clickHandler, isExpanded } = props;
  return (
    <div onClick={clickHandler}>
      <span
        className={`toggler-icon ${isExpanded ? "toggler-icon-open" : ""}`}
      />
    </div>
  );
}
