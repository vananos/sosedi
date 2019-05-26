import React from "react";
import "./Button.scss";

export default function Button(props) {
  const { children, className, disabled, progress, color, onClick } = props;

  return (
    <button
      className={`btn ${color} ${className ? className : ""} ${
        progress ? "btn-blink" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
