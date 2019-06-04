import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = props => {
  const {
    children,
    className,
    disabled,
    progress,
    color,
    onClick,
    style
  } = props;

  const colorClass = `btn-${color}`;
  const progressClass = progress ? "btn-blink" : "";
  const disabledClass = disabled || color === "disabled" ? "btn-disabled" : "";
  return (
    <button
      className={`btn ${colorClass} ${className} ${progressClass} ${disabledClass}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  disabled: false,
  progress: false,
  color: "green"
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disable: PropTypes.bool,
  progress: PropTypes.bool,
  color: PropTypes.oneOf(["green", "yellow", "disabled"]),
  onClick: PropTypes.func,
  style: PropTypes.object
};

export default Button;
