import React, { Component } from "react";
import Toggler from "./Toggler";
import NavItem from "./NavItem";
import plusIcon from "../../assets/navbar/plus-solid.svg";
import cogsIcon from "../../assets/navbar/cogs-solid.svg";
import commentIcon from "../../assets/navbar/comment-solid.svg";
import userIcon from "../../assets/navbar/user-solid.svg";
import scrollIcon from "../../assets/navbar/scroll-solid.svg";
import headset from "../../assets/navbar/headset-solid.svg";
import question from "../../assets/navbar/question-circle-solid.svg";
import "./navbar.css";

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
        className={`modal ${isExpanded ? "modal-expanded" : ""}`}
        onClick={this.toggleNavbar}
      >
        <div
          className={`nav-container ${
            isExpanded ? "nav-container-expanded" : ""
          }`}
          onClick={e => e.stopPropagation()}
        >
          <Toggler
            clickHandler={e => {
              this.toggleNavbar();
            }}
            isExpanded={isExpanded}
            className="nav-toggler"
          />
          <div className={`${isExpanded ? "navbar-expanded" : ""} navbar`}>
            <nav>
              <NavItem href="/" icon={plusIcon}>
                Создать объявление
              </NavItem>
              <NavItem href="/" icon={commentIcon}>
                Сообщения
              </NavItem>
              <NavItem href="/" icon={scrollIcon}>
                Мои объявления
              </NavItem>
              <NavItem href="/" icon={userIcon}>
                Мой профиль
              </NavItem>
              <NavItem href="/" icon={cogsIcon}>
                Настройки
              </NavItem>
            </nav>
            <div className="nav-footer">
              <div>
                <span>Нужна помощь?</span>
                <img src={question} width="14px" height="14px" alt="помощь" className="nav-footer-icon"/>
              </div>
              <div>
                <span>Есть предложения по улучшению?</span>
                <img src={headset} width="14px" height="14px" alt="предложения" className="nav-footer-icon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
