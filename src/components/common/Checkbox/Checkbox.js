import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Checkbox.scss";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  changeState = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  render() {
    const { value, id, name, children, size } = this.props;
    const { checked } = this.state;
    return (
      <div
        className={`checkbox ${checked ? "checkbox-checked" : ""}`}
        onClick={this.changeState}
        style={{width: size, height: size}}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={() => {}}
        />
        {children}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  checked : false, 
  size: 120
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
  size: PropTypes.number
};
