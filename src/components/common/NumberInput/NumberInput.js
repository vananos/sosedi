import React, { Component } from "react";
import Arrow from "../../icons/common/Arrow";
import PropTypes from "prop-types";
import "./NumberInput.scss";

export default class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  handleChange = e => {
    const newValue = +e.target.value;

    if (!isNaN(+newValue)) {
      if (!this.inMinMaxRange(newValue)) {
        return;
      }

      this.setState({
        value: newValue
      });
    }
  };

  inMinMaxRange = value => {
    const { min, max } = this.props;

    return ((min && value > min) || true) && ((max && value < max) || true);
  };

  changeValue = step => {
    this.state.interval = setInterval(() => {
      const newValue = this.state.value + step;
      if (this.inMinMaxRange(newValue)) {
        this.setState({ value: newValue });
      }
    }, 200);
  };

  clearValue = () => {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
    }
  };

  render() {
    const { min, max, name, width } = this.props;
    const { value } = this.state;
    return (
      <div className="number-input">
        <span
          className="number-input-up"
          onMouseDown={_ => this.changeValue(+1)}
          onMouseUp={_ => this.clearValue()}
        >
          <Arrow />
        </span>
        <input
          type="text"
          onChange={this.handleChange}
          name={name}
          value={value}
          min={min}
          max={max}
          style={{ width: width }}
        />
        <span
          className="number-input-down"
          onMouseDown={_ => this.changeValue(-1)}
          onMouseUp={_ => this.clearValue()}
        >
          <Arrow />
        </span>
      </div>
    );
  }
}

NumberInput.defaultProps = {
  width: 20,
  value: 0
};

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  width: PropTypes.number
};
