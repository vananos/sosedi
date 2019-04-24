import React, { Component } from "react";
import infoCircle from "../../assets/common/info-circle-solid.svg";
import "./TextInput.css";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: this.isEmpty(props.value),
      value: props.value,
      changeHandler: props.onChange
    };
  }

  isEmpty = str => Boolean(!str || str === "");

  handleChange = e => {
    const isEmpty = this.isEmpty(e.target.value);
    this.setState({
      value: e.target.value
    });
    if (isEmpty ^ this.state.isEmpty) {
      this.setState({
        isEmpty: isEmpty
      });
    }
    this.state.changeHandler && this.state.changeHandler(e);
  };

  setValue = value => {
    this.setState({ value });
  };

  render() {
    const { placeholder, name, id, label, info, className } = this.props;
    return (
      <div className={className}>
        <div className="text-input-wrapper">
          <input
            type="text"
            className="text-input"
            placeholder={placeholder}
            name={name}
            id={id}
            value={this.state.value}
            onChange={this.handleChange}
          />
          <div className={`label-info ${this.state.isEmpty ? "" : "filled"}`}>
            {label && <span className="label">{label}</span>}
            {info && (
              <img src={infoCircle} alt="info" width="10px" height="10px" />
            )}
          </div>
        </div>
      </div>
    );
  }
}
