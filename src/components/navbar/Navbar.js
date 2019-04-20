import React, { Component } from "react";
import Toggler from "./Toggler";
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
      <div className={`modal ${isExpanded ? "modal-expanded" : ""}`}>
        <div
          className={`nav-container ${
            isExpanded ? "nav-container-expanded" : ""
          }`}
        >
          <Toggler clickHandler={this.toggleNavbar} isExpanded={isExpanded} />
        </div>
      </div>
    );
  }
}
