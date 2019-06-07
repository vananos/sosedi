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
    this.setState({
      value: newValue
    });
  };

  startChangeValue = step => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    this.setState({ value: this.state.value + step });

    this.state.interval = setInterval(() => {
      this.setState({ value: this.state.value + step });
    }, 200);
  };

  clearValue = () => {
    const { interval } = this.state;
    if (interval) {
      clearInterval(interval);
    }
  };

  render() {
    const { min, max, name, width, label } = this.props;
    const { value } = this.state;
    return (
      <div className="number-input">
        <input
          type="number"
          onChange={this.handleChange}
          name={name}
          value={value}
          min={min}
          max={max}
          style={{ width: width }}
        />
        <div>
          <Arrow
            className="number-input-down"
            onMouseDown={_ => this.startChangeValue(-1)}
            onMouseUp={_ => this.stopValueChange()}
            onTouchStart={_ => this.startChangeValue(-1)}
            onTouchEnd={_ => this.stopValueChange()}
          />
          <label>{label}</label>
          <Arrow
            className="number-input-up"
            onMouseDown={_ => this.startChangeValue(+1)}
            onMouseUp={_ => this.stopValueChange()}
            onTouchStart={_ => this.startChangeValue(+1)}
            onTouchEnd={_ => this.stopValueChange()}
          />
        </div>
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
  width: PropTypes.number,
  label: PropTypes.string.isRequired
};
