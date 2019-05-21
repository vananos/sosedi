import React, { Component } from "react";
import infoCircle from "../../assets/common/info-circle-solid.svg";
import "./TextInput.scss";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: this.isEmpty(props.value),
      value: props.value,
      changeHandler: props.onChange
    };
    this.inputRef = React.createRef();
  }

  isEmpty = str => Boolean(!str || str === "");

  handleChange = e => {
    const newValue = e.target.value;
    const isEmpty = this.isEmpty(newValue);
    const newState = {
      value: newValue
    };

    this.setState(newState);

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
    const {
      type,
      name,
      id,
      label,
      info,
      className,
      error: { error: errorMsg, value: wrongValue } = {}
    } = this.props;
    const currentValue = this.state.value;
    const shouldShowError = errorMsg && this.state.value === wrongValue;

    return (
      <div className={className}>
        <div
          className={`text-input-wrapper ${shouldShowError ? "error" : ""}`}
          onClick={e => this.inputRef.current.focus()}
        >
          <input
            ref={this.inputRef}
            type={type ? type : "text"}
            className={`text-input`}
            name={name}
            id={id}
            value={currentValue}
            onChange={this.handleChange}
          />
          <div className={`label-info ${this.state.isEmpty ? "" : "filled"}`}>
            {label && <span className="label">{label}</span>}
            {info && (
              <img src={infoCircle} alt="info" width="10px" height="10px" />
            )}
          </div>
        </div>
        {shouldShowError && (
          <span className="error-description">{errorMsg}</span>
        )}
      </div>
    );
  }
}
