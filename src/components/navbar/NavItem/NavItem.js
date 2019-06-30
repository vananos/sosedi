import React from "react";
import "./NavItem.css";
import { NavLink } from "react-router-dom";
import Checkmark from "../../common/Checkmark/Checkmark";

export default function NavItem(props) {
  const { icon, href, children, onClick } = props;
  return (
    <div className="nav-item">
      <NavLink
        to={href}
        onClick={() => onClick && onClick()}
        className="nav-link"
        activeClassName="nav-link-active"
      >
        <img src={icon} alt="icon" className="nav-icon" />
        <span className="nav-link-description">
        {children}
        </span>
        <Checkmark className="proceed"/>
      </NavLink>
    </div>
  );
}
