import React from "react";
import "./Checkmark.scss";

export default function Checkmark(props) {
  return (
    <div {...props}>
      <span className="checkmark" />
    </div>
  );
}
