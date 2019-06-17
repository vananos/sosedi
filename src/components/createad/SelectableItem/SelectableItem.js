import React, { Component } from "react";
import "./SelectableItem.scss";
import PropTypes from "prop-types";

export default class SelectableItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      checked: props.checked,
      changed: false
    };
  }

  render() {
    const { name, id, children, className = "" } = this.props;
    const { checked, changed } = this.state;
    return (
      <div
        className={`selectable-item ${className}`}
        onClick={_ =>
          this.setState({ checked: !this.state.checked, changed: true })
        }
      >
        <input
          type="checkbox"
          name={name}
          id={id}
          className="checkbox"
          checked={checked}
          onChange={() => {}}
        />
        {checked ? (
          <label className="checked">{children}</label>
        ) : (
          <label className="unchecked">{children}</label>
        )}
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
