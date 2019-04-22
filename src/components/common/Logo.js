import React from "react";
import "./logo.css";

export default function Logo(props) {
  const customClass = props.className || "";
  return (
    <div className={`${customClass} logo`}>
      <span className="logo-dash logo-dash-left" />
      <span className="logo-text">sosedi</span>
      <span className="logo-dash logo-dash-right" />
    </div>
  );
}
