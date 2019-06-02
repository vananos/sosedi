import React, { Component } from "react";
import infoCircle from "../../../assets/common/info-circle-solid.svg";
import PropTypes from "prop-types";
import "./Input.scss";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      changeHandler: props.onChange
    };
    this.inputRef = React.createRef();
  }

  handleChange = e => {
    if (this.state.changeHandler) {
      const shouldContinue = this.state.changeHandler(e, this);
      if (!shouldContinue) return;
    }
    const newValue = e.target.value;
    this.setState({
      value: newValue
    });
  };

  render() {
    const {
      type,
      name,
      id,
      label,
      info,
      max,
      className,
      pattern,
      error: { error: errorMsg, value: wrongValue } = {}
    } = this.props;

    const currentValue = this.state.value;

    const mustShowError = errorMsg && this.state.value === wrongValue;

    const isDateInput = type === "date";

    return (
      <div
        className={`input-wrapper ${mustShowError ? "error" : ""} ${className}`}
        onClick={e => this.inputRef.current.focus()}
      >
        <input
          ref={this.inputRef}
          type={!isDateInput ? type : "text"}
          className="input"
          name={name}
          id={id}
          value={currentValue}
          onChange={this.handleChange}
          max={max}
          onFocus={
            isDateInput
              ? _ =>
                  (this.inputRef.current.type = "date") &&
                  this.inputRef.current.focus()
              : undefined
          }
          onBlur={
            isDateInput ? _ => (this.inputRef.current.type = "text") : undefined
          }
        />
        <div className={`label-info ${currentValue !== "" ? "filled" : ""}`}>
          <span className="label">{label}</span>
          {info && (
            <img src={infoCircle} alt="info" width="10px" height="10px" />
          )}
        </div>
        {mustShowError && <span className="error-description">{errorMsg}</span>}
      </div>
    );
  }
}

Input.defaultProps = {
  type: "text",
  className: ""
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.object
};
