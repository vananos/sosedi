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
    this.state.changeHandler(e, this);
    const newValue = e.target.value;
    this.setState({
      value: newValue
    });
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
      max,
      className,
      onBlur,
      error: { error: errorMsg, value: wrongValue } = {}
    } = this.props;

    const currentValue = this.state.value;

    const mustShowError = errorMsg && this.state.value === wrongValue;
    return (
      <div
        className={`input-wrapper ${mustShowError ? "error" : ""} ${className}`}
        onClick={e => this.inputRef.current.focus()}
      >
        <input
          ref={this.inputRef}
          type={type}
          className="input"
          name={name}
          id={id}
          value={currentValue}
          onChange={this.handleChange}
          onBlur={onBlur}
          max={max}
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
  className: "",
  onChange: () => {}
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};
