import React, { Component } from "react";
import "./Slider.css";

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMin: +props.currentMin,
      currentMax: +props.currentMax
    };
  }

  render() {
    const { min, max } = this.props;
    return (
      <div className="multi-range">
        <input
          type="range"
          min={min}
          max={max}
          value={this.state.currentMin}
          onChange={e => {
            const newValue = +e.target.value;
            if (newValue < this.state.currentMax) {
              this.setState({
                currentMin: newValue
              });
            }
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={this.state.currentMax}
          onChange={e => {
            const newValue = +e.target.value;
            if (newValue > this.state.currentMin) {
              this.setState({
                currentMax: newValue
              });
            }
          }}
        />
      </div>
    );
  }
}
