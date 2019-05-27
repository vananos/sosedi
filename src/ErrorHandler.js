import React, { Component } from "react";

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
      console.log('UPSSS');
      this.setState({hasError: true});
  }

  render() {
      if(this.state.hasError) {
        return <h1>Пиздец...</h1>
      }
    return this.props.children;
  }
}
