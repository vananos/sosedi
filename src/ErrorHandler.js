import React, { Component } from "react";
import browserHistory from "./browserHistory";
import Modal from "./components/common/Modal/Modal";

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      Modal.hide();
      browserHistory.push("/error");
    }
    return this.props.children;
  }
}
