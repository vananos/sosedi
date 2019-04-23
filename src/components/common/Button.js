import React from "react";
import "./Button.css";

export default function Button(props) {
  const { children, className, customHandler, disabled } = props;

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
      <div className="btn-border">
        <button
          className={`btn ${disabled ? "btn-disabled" : ""}`}
          onClick={e => e.preventDefault()}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
