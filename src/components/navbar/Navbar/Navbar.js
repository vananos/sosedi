import React, { Component } from "react";
import Toggler from "../Toggler/Toggler";
import NavItem from "../NavItem/NavItem";
import cogsIcon from "../../../assets/navbar/cogs-solid.svg";
import userIcon from "../../../assets/navbar/user-solid.svg";
import scrollIcon from "../../../assets/navbar/scroll-solid.svg";
import browserHistory from "../../../browserHistory";
import question from "../../../assets/navbar/question-circle-solid.svg";
import "./Navbar.scss";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: this.props.isExpanded
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
      <div className="nav">
        <Toggler
          clickHandler={e => {
            this.toggleNavbar();
          }}
          isExpanded={isExpanded}
          className="nav-toggler"
        />
        <div
          className={`nav-content ${isExpanded ? "nav-content-expanded" : ""}`}
        >
          <nav>
            <NavItem
              href="/matching"
              onClick={this.toggleNavbar}
              icon={scrollIcon}
            >
              Поиск соседа
            </NavItem>
            <NavItem
              href="/create-ad"
              onClick={this.toggleNavbar}
              icon={scrollIcon}
            >
              Мое объявление
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
          <div className="nav-footer">
            <div
              onClick={_ => {
                browserHistory.push("/help");
                this.toggleNavbar();
              }}
            >
              <span>Нужна помощь?</span>
              <img
                src={question}
                width="14px"
                height="14px"
                alt="помощь"
                className="nav-footer-icon"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
