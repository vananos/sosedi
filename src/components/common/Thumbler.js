import React, { Component } from "react";
import "./Thumbler.scss";

export default class Thumbler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetState: props.targetState || "default"
    };
  }

  updateState = (e, state) => {
    console.log('ups');
    this.setState({ targetState: state });
    e.stopPropagation();
  };

  render() {
    const { value1, value2, name } = this.props;
    const targetState = this.state.targetState;
    return (
      <div className="thumbler" onClick={e => this.updateState(e, "default")}>
        <div
          className="no-btn"
          style={{ opacity: targetState === "no" ? "0.7" : null }}
          onClick={e => this.updateState(e, "no")}
        />
        <div
          className={`target ${targetState}`}>
          Сигареты
        </div>
        <div
          className="yes-btn"
          onClick={e => this.updateState(e, "yes")}
          style={{ opacity: targetState === "yes" ? "0.9" : null }}
        />
      </div>
    );
  }
}
