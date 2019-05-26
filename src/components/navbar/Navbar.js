import React, { Component } from "react";
import Toggler from "./Toggler";
import NavItem from "./NavItem";
import Logo from "../common/Logo";
import cogsIcon from "../../assets/navbar/cogs-solid.svg";
import commentIcon from "../../assets/navbar/comment-solid.svg";
import userIcon from "../../assets/navbar/user-solid.svg";
import scrollIcon from "../../assets/navbar/scroll-solid.svg";
import headset from "../../assets/navbar/headset-solid.svg";
import question from "../../assets/navbar/question-circle-solid.svg";
import "./Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleNavbar = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    const isExpanded = this.state.isExpanded;
    return (
      <div
        className={`modal-nav ${isExpanded ? "modal-expanded" : ""}`}
        onClick={this.toggleNavbar}
      >
        <div
          className={`nav-container ${
            isExpanded ? "nav-container-expanded" : ""
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="nav-header">
            <Toggler
              clickHandler={e => {
                this.toggleNavbar();
              }}
              isExpanded={isExpanded}
              className="nav-toggler"
            />
            <div className={`${isExpanded ? "navbar-expanded" : ""} navbar`}>
              <Logo className="nav-logo" />
            </div>
          </div>
          <div className="nav-hidding-area">
            <div className="nav-content">
              <nav>
                <NavItem
                  href="/create-ad"
                  onClick={this.toggleNavbar}
                  icon={scrollIcon}
                >
                  Мое объявление
                </NavItem>
                <NavItem
                  href="/messages"
                  onClick={this.toggleNavbar}
                  icon={commentIcon}
                >
                  Сообщения
                </NavItem>
                <NavItem
                  href="/profile"
                  onClick={this.toggleNavbar}
                  icon={userIcon}
                >
                  Мой профиль
                </NavItem>
                <NavItem
                  href="/settings"
                  onClick={this.toggleNavbar}
                  icon={cogsIcon}
                >
                  Настройки
                </NavItem>
              </nav>
            </div>
            <div className="nav-footer">
              <div>
                <span>Нужна помощь?</span>
                <img
                  src={question}
                  width="14px"
                  height="14px"
                  alt="помощь"
                  className="nav-footer-icon"
                />
              </div>
              <div>
                <span>Есть предложения по улучшению?</span>
                <img
                  src={headset}
                  width="14px"
                  height="14px"
                  alt="предложения"
                  className="nav-footer-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
