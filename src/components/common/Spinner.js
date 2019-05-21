import React from "react";
import "./Spinner.scss";

export default function Spinner(props) {
  const { display } = { ...props };
  return (
    <div
      className="spinner-wrapper"
      style={{ display: display ? "flex" : "none" }}
    >
      <div className="spinner" />
    </div>
  );
}
