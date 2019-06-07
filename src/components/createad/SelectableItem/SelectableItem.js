import React, { Component } from "react";
import "./SelectableItem.scss";
import PropTypes from "prop-types";

export default class SelectableItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked
    };
  }

  render() {
    const { name, id, children, className = "" } = this.props;
    const { checked } = this.state;

    return (
      <div
        className={`selectable-item ${className}`}
        onClick={_ => this.setState({ checked: !this.state.checked })}
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          className="checkbox"
          checked={checked}
          onChange={() => {}}
        />
        <label>{children}</label>
      </div>
    );
  }
}

SelectableItem.defaultProps = {
  checked: false
};

SelectableItem.propTypes = {
  checked: PropTypes.bool
};
