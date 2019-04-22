import React from "react";
import "./navitem.css";
import { Link } from "react-router-dom";
import Checkmark from "./Checkmark";

export default function NavItem(props) {
  const { icon, href, children, onClick } = props;
  return (
    <div className="nav-item">
      <Link to={href} onClick={() => onClick && onClick()} className="nav-link">
        <img src={icon} alt="icon" className="nav-icon" />
        {children}
        <Checkmark className="proceed"/>
      </Link>
    </div>
  );
}
