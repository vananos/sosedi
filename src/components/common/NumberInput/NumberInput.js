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
    if (this.isValidValue(newValue)) {
      this.setState({
        value: newValue
      });
    }
  };

  startChangeValue = step => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }

    const changeValue = () =>
      this.isValidValue(this.state.value + step) &&
      this.setState({ value: this.state.value + step });

    changeValue();

    this.state.interval = setInterval(changeValue, 200);
  };

  isValidValue = value => {
    const { min, max } = this.props;

    return ((min && value > +min) || !min) && ((max && value < +max) || !max);
  };

  stopValueChange = () => {
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
  min: PropTypes.string,
  max: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  width: PropTypes.number,
  label: PropTypes.string.isRequired
};
