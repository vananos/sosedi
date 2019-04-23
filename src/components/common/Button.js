import React from "react";
import "./Button.css";

export default function Button(props) {
  const {
    children,
    className,
    customHandler,
    disabled,
    bordered,
    color
  } = props;

  const clickHandler = e => {
    if (!disabled) {
      customHandler(e);
    }
  };

  return (
    <div
      className={`btn-wrapper ${className ? className : ""}`}
      onClick={clickHandler}
    >
      <div className={`${bordered ? "btn-border" : ""}`}>
        <button
          className={`btn ${disabled ? "btn-disabled" : ""} ${color}`}
          onClick={e => e.preventDefault()}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
