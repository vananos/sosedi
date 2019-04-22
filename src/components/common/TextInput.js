import React, { Component } from "react";
import infoCircle from "../../assets/common/info-circle-solid.svg";
import "./TextInput.css";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: this.isEmpty(props.value)
    };
  }

  isEmpty = str => Boolean(!str || str === "");

  handleChange = e => {
    const isEmpty = this.isEmpty(e.target.value);
    if (isEmpty ^ this.state.isEmpty) {
      this.setState({
        isEmpty: isEmpty
      });
    }
  };

  render() {
    const { placeholder, name, id, value, label, info, className } = this.props;
    return (
      <div className={className}>
        <div className="text-input-wrapper">
          <input
            type="text"
            className="text-input"
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={this.handleChange}
          />
          <div className={`label-info ${this.state.isEmpty ? "" : "filled"}`}>
            {label && <span className="label">{label}</span>}
            {info && <img src={infoCircle} alt="info" width="10px" height="10px"/>}
          </div>
        </div>
      </div>
    );
  }
}
