import React from "react";
import "./Button.scss";

export default function Button(props) {
  const { children, className, onClick, disabled, color } = props;

  const clickHandler = e => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`btn ${disabled ? "btn-disabled" : ""} ${color} ${className ? className : ""}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
