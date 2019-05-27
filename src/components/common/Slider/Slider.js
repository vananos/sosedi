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

  minValueChange = newValue => {
    const { max, double } = this.props;
    const newState = {
      currentMin: double && newValue >= max ? max - 1 : newValue
    };
    if (double && newValue >= this.state.currentMax) {
      newState.currentMax = newState.currentMin + 1;
    }
    this.setState(newState);
  };

  maxValueChange = newValue => {
    const { min } = this.props;
    const newState = {
      currentMax: newValue <= min ? +min + 1 : newValue
    };
    if (newValue <= this.state.currentMin) {
      newState.currentMin = newState.currentMax - 1;
    }
    this.setState(newState);
  };

  handleMinUnselectedAreaClick = e => {
    const elementWidth = e.nativeEvent.target.offsetWidth;
    const scale = elementWidth / (this.state.currentMin - this.props.min);
    const newCurrentMin = e.nativeEvent.offsetX / scale;
    this.minValueChange(Math.round(newCurrentMin));
  };

  handleMaxUnselectedAreaClick = e => {
    const elementWidth = e.nativeEvent.target.offsetWidth;
    const scale = elementWidth / (this.props.max - this.state.currentMax);
    const newCurrentMin = e.nativeEvent.offsetX / scale + this.state.currentMax;
    this.maxValueChange(Math.round(newCurrentMin));
  };

  render() {
    const { min, max, double } = this.props;
    const { currentMin, currentMax } = this.state;
    const rangeSize = max - min;
    const minOffset = ((currentMin - min) / rangeSize) * 100;
    const maxOffset = ((currentMax - min) / rangeSize) * 100;
    return (
      <div className="multi-range">
        <div>
          <span
            className="unselected"
            style={{ width: `${minOffset}%` }}
            onClick={this.handleMinUnselectedAreaClick}
          />
          <input
            type="range"
            min={min}
            max={max}
            name="min-value"
            step="1"
            value={currentMin}
            onChange={e => this.minValueChange(+e.target.value)}
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
              <span
                className="unselected"
                style={{ width: `calc(100% - ${maxOffset}%)`, right: "0" }}
                onClick={this.handleMaxUnselectedAreaClick}
              />
              <input
                type="range"
                min={min}
                max={max}
                value={currentMax}
                onChange={e => this.maxValueChange(+e.target.value)}
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
