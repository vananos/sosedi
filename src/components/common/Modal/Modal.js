import "./Modal.scss";

import React, { Component } from "react";
import PropTypes from "prop-types";
import Popup from "../Popup/Popup";
import Spinner from "../Spinner/Spinner";

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Modal._singletonRef = this;
  }

  static showModal = (content, onClick) =>
    Modal._singletonRef.setState({ content, onClick });

  static hide = () => {
    Modal._singletonRef.setState({ content: null });
  }
  static showPopup = (content, onClose) =>
    Modal.showModal(<Popup onCloseHandler={onClose}>{content}</Popup>, onClose);

  static showSpinner = () => Modal.showModal(<Spinner />);

  render() {
    let { content, onClick } = this.state;

    if (!onClick) {
      onClick = e => {
        Modal.hide();
        e.stopPropagation();
      };
    }

    return (
      <div
        className="modal"
        onClick={onClick}
        style={{ display: content ? "flex" : "none" }}
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
