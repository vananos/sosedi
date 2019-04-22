import React from "react";
import "./Button.css";

export default function Button(props) {
  const { children, className } = props;
  return (
    <div className={`${className ? className : ""} btn-wrapper`}>
      <button className="btn">{children}</button>
    </div>
  );
}
