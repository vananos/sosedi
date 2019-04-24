import React, { Component } from "react";
import "./Checkbox.css";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.checked
    };
  }

  changeState = () => {
    this.setState({
      selected: !this.state.selected
    });
  };

  render() {
    const { value, id, name, className, children } = this.props;
    return (
      <div className="checkbox-wrapper">
        <div
          className={`checkbox ${className ? className : ""} ${
            this.state.selected ? "checkbox-selected" : ""
          }`}
          onClick={this.changeState}
        >
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={this.state.checked}
          />
          <span>{children}</span>
        </div>
      </div>
    );
  }
}
