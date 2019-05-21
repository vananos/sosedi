import React, { Component } from "react";
import "./Checkbox.scss";

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
    const { value, id, name, className, children, style } = this.props;
    return (
      <div className={className}>
        <div className={`checkbox-wrapper`} style={style}>
          <div
            className={`checkbox ${
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
      </div>
    );
  }
}
