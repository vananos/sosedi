import React from "react";
import PropTypes from "prop-types"

const SvgArrow = props => {
  const {color} = props;
  return (
    <svg width={20} height={27.143} {...props}>
      <g data-name="Polygon 16" fill={color} className="arrow">
        <path d="M19.283 26.643H.717L10 1.446l9.283 25.197z" />
        <path d="M10 2.893l-8.566 23.25h17.132L10 2.893M10 0l10 27.143H0L10 0z" />
      </g>
    </svg>
  );
};

SvgArrow.defaultProps = {
  color: "#ababab"
}

export default SvgArrow;
