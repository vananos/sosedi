import "./Modal.scss";

import React, { Component } from "react";
import PropTypes from "prop-types";

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

    if (!onClick) {
      onClick = e => {
        Modal.hideModal();
        e.stopPropagation();
      };
    }

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

Modal.propTypes = {
  content: PropTypes.node,
  onClick: PropTypes.func
};
