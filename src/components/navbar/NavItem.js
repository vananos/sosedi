import React from "react";
import "./navitem.css";
import { Link } from "react-router-dom";

export default function NavItem(props) {
  const { icon, href, children } = props;
  return (
    <div className="nav-item">
      <Link to={href} className="nav-link">
        <img src={icon} alt="icon" className="nav-icon"/>
        {children}
      </Link>
    </div>
  );
}
