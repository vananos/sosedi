import React, { Component } from "react";
import Checkmark from "../../common/Checkmark/Checkmark";
import "./Expandable.scss";
import PropTypes from "prop-types";

export default class Expandable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expaned: props.expanded
    };
  }

  render() {
    const { message, children } = this.props;
    const { expanded } = this.state;

    return (
      <React.Fragment>
        <div
          className={`expandable ${expanded ? "expanded" : ""}`}
          onClick={() =>
            this.setState({
              expanded: !this.state.expanded
            })
          }
        >
          <span className="message">{message}</span>
          <Checkmark className="expandable-checkmark"/>
        </div>
        <div className={expanded ? "expandable-shown" : "expandable-hidden"}>
          {children}
        </div>
      </React.Fragment>
    );
  }
}

Expandable.defaultProps = {
  expanded: false
};

Expandable.propTypes = {
  expanded: PropTypes.bool
};
