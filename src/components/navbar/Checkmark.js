import React from "react";
import "./checkmark.css";

export default function Checkmark(props) {
  return <span className={`checkmark ${props.className}`} />;
}
