import React, { Component } from "react";
import "./Slider.scss";

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
    const rangeSize = max - min;

    return (
      <div className="multi-range">
        <div>
          <input
            type="range"
            min={min}
            max={max}
            name="min-value"
            step="1"
            value={currentMin}
            onChange={e => {
              const newValue = +e.target.value;
              const newState = {
                currentMin: newValue >= max ? max - 1 : newValue
              };
              if (newValue >= this.state.currentMax) {
                newState.currentMax = newState.currentMin + 1;
              }
              this.setState(newState);
            }}
          />
          <output
            className="slider-hint"
            style={{
              left: `calc(${((currentMin - min) / rangeSize) * 100}% - 0.8em)`
            }}
          >
            {currentMin}
          </output>
          <input
            type="range"
            min={min}
            max={max}
            value={currentMax}
            onChange={e => {
              const newValue = +e.target.value;
              const newState = {
                currentMax: newValue <= min ? +min + 1 : newValue
              };
              if (newValue <= this.state.currentMin) {
                newState.currentMin = newState.currentMax - 1;
              }
              this.setState(newState);
            }}
          />
          <output
            className="slider-hint"
            style={{
              left: `calc(${((currentMax - min) / rangeSize) * 100}% + 4px)`
            }}
          >
            {currentMax}
          </output>
        </div>
      </div>
    );
  }
}
