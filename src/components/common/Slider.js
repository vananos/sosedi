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
    const { min, max, double } = this.props;
    const { currentMin, currentMax } = this.state;
    const rangeSize = max - min;
    const minOffset = ((currentMin - min) / rangeSize) * 100;
    const maxOffset = ((currentMax - min) / rangeSize) * 100;
    return (
      <div className="multi-range">
        <div>
          <span className="unselected" style={{ width: `${minOffset}%` }} />
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
                currentMin: double && newValue >= max ? max - 1 : newValue
              };
              if (double && newValue >= this.state.currentMax) {
                newState.currentMax = newState.currentMin + 1;
              }
              this.setState(newState);
            }}
          />
          <output
            className="slider-hint"
            style={{
              left: `calc(${minOffset}% - 0.8em)`
            }}
          >
            {currentMin}
          </output>
          {double ? (
            <React.Fragment>
              <span className="unselected" style={{ width: `calc(100% - ${maxOffset}%)`, right: '0' }} />
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
                  left: `calc(${maxOffset}% + 4px)`
                }}
              >
                {currentMax}
              </output>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
