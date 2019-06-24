import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Textarea.scss";

export default class Textarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || ""
    };
  }

  handleInput = e => {
    if (e.target.value.length < this.props.maxlen) {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const { className, name, maxlen, defaultValue } = this.props;
    const { value } = this.state;

    const textareaClassName = "textarea " + (className ? className : "");
    return (
      <div className={textareaClassName}>
        <span className="textarea-length-counter">
          {`${value.length}/${maxlen}`}
        </span>
        <textarea
          value={value}
          name={name}
          onChange={this.handleInput}
          onInput={this.handleInput}
        />
      </div>
    );
  }
}

Textarea.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string.isRequired,
  maxlen: PropTypes.number.isRequired
};
