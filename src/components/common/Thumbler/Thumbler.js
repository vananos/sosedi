import React, { Component } from "react";
import "./Thumbler.scss";
import PropTypes from "prop-types";

export default class Thumbler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetState: props.targetState || "default"
    };
  }

  updateState = (e, state) => {
    this.setState({ targetState: state });
    e.stopPropagation();
  };

  render() {
    const { children, name } = this.props;
    const targetState = this.state.targetState;
    return (
      <div className="thumbler" onClick={e => this.updateState(e, "default")}>
        <input type="text" name={name} hidden value={targetState} readOnly/>
        <div
          className={`no-btn ${targetState === "no" ? "no" : ""}`}
          onClick={e => this.updateState(e, "no")}
        />
        <div className={`target ${targetState}`}>{children}</div>
        <div
          className={`yes-btn ${targetState === "yes" ? "yes" : ""}`}
          onClick={e => this.updateState(e, "yes")}
        />
      </div>
    );
  }
}

Thumbler.propTypes = {
  children: PropTypes.node.isRequired
};
