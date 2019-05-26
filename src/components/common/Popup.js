import React, { Component } from "react";
import "./Popup.scss";
import Modal from "./Modal";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showPopup = content => {
    this.setState({
      visible: true,
      content
    });
  };

  closePopup = () => {
    this.setState({
      visible: false,
      content: null
    });
  };

  onCloseHandler = e => {
    e.stopPropagation();
    const customHandler = this.props.onClose;
    if (customHandler) {
      const result = customHandler();
      if (!result) return;
    }
    this.closePopup();
  };

  render() {
    const { visible, content } = this.state;
    return (
      <Modal onClick={this.onCloseHandler} display={visible}>
        <div className="popup">{content}</div>
      </Modal>
    );
  }
}
