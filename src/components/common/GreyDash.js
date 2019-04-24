import React from "react";
import "./GreyDash.css";

export default function GreyDash({ className }) {
  return <div className={`grey-dash ${className || ""}`} />;
}
