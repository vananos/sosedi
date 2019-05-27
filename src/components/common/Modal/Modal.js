import "./Modal.scss";

import React, { Component } from "react";
import { connect } from "tls";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Modal._singletonRef = this;
  }

  static showModal = (content, onClick) =>
    Modal._singletonRef.setState({ content, onClick });

  static hideModal = () => Modal._singletonRef.setState({ content: null });

  render() {
    const { content, onClick } = this.state;
    return (
      <div
        className="modal"
        onClick={onClick}
        style={{ display: !!content ? "flex" : "none" }}
      >
        {content}
      </div>
    );
  }
}
