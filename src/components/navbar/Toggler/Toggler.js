import "./Toggler.css";
import React from "react";
import PropTypes from "prop-types";

export default function Toggler(props) {
  const { isExpanded, clickHandler, className } = props;
  return (
    <div onClick={clickHandler} className={`toggler ${className}`}>
      <span
        className={`toggler-icon ${isExpanded ? "toggler-icon-expanded" : ""}`}
      />
    </div>
  );
}

Toggler.defaultProps = {
  isExpanded: false
};

Toggler.propTypes = {
  isExpanded: PropTypes.bool
};
