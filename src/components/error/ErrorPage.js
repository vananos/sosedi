import React from "react";
import "./ErrorPage.scss";
import logo from "../../assets/logo_white.svg";
import brokenLogo from "../../assets/error/broken.svg";
import refresh from "../../assets/error/refresh.svg";
import {NavLink} from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="errorpage">
      <div className="errorpage-header">
        <img src={logo} alt="logo" />
      </div>
      <div className="errorpage-content">
        <div className="errorpage-content-message">
          <img src={brokenLogo} alt="broken" />
          <p className="errorpage-description">
            Кажется, что-то пошло не так. Попробуй
            <NavLink to="/">
              <img src={refresh} alt="refresh" /> перезагрузить страницу
            </NavLink>{" "}
            или зайти позже
          </p>
        </div>
      </div>
    </div>
  );
}
