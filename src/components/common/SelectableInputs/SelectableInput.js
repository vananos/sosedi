import React, { Component } from "react";
import "./SelectableInput.scss";
import PropTypes from "prop-types";

export default class SelectableInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  render() {
    const {
      name,
      id,
      children,
      className = "",
      type,
      checked,
      value,
      readOnly
    } = this.props;
    return (
      <div
        className={`selectable-item ${className}`}
        onClick={_ => !readOnly && this.inputRef.current.click()}
      >
        <input
          type={type}
          name={name}
          id={id}
          className={type}
          defaultChecked={checked}
          onChange={() => {}}
          value={value}
          ref={this.inputRef}
        />
        <label>{children}</label>
      </div>
    );
  }
}

SelectableInput.defaultProps = {
  checked: false,
  readOnly: false
};

SelectableInput.propTypes = {
  checked: PropTypes.bool,
  type: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
  readOnly: PropTypes.bool
};
