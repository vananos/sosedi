import React from "react";
import "./Checkmark.css";

export default function Checkmark(props) {
  return <span className={`checkmark ${props.className}`} />;
}
