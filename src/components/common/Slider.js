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
    const { currentMin, currentMax } = this.state;
    return (
      <div className="multi-range">
        <input
          type="range"
          min={min}
          max={max}
          name="min-value"
          value={currentMin}
          onChange={e => {
            const newValue = +e.target.value;
            console.log(newValue);
            if (newValue < this.state.currentMax) {
              this.setState({
                currentMin: newValue
              });
            }
          }}
        />
        <output className="slider-hint" style={{left: ((currentMin - min )/ max) * 100 + '%'}}>{currentMin}</output>
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={e => {
            const newValue = +e.target.value;
            if (newValue > this.state.currentMin) {
              this.setState({
                currentMax: newValue
              });
            }
          }}
        />
        <output className="slider-hint" style={{left: ((currentMax - min )/ max) * 100 - 2 + '%', top: "-15px"}}>{currentMax}</output>
      </div>
    );
  }
}
