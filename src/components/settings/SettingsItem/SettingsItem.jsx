import React, { Component } from "react";
import "./SettingsItem.scss";
import Checkmark from "../../common/Checkmark/Checkmark";
import PropTypes from "prop-types";

export default function SettingsItem({
  description,
  withoutBorder,
  expanded,
  onClick,
  children
}) {
  return (
    <div className={`settings-item ${withoutBorder ? "" : "bordered"}`}>
      <div className="settings-item-header" onClick={onClick}>
        <span>{description}</span>
        <Checkmark
          className={`settings-item-checkmark ${
            expanded ? "settings-item-checkmark-expanded" : ""
          }`}
        />
      </div>
      <div
        className={`settings-item-content ${
          expanded ? "settings-item-content-expanded" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}

SettingsItem.defaultProps = {
  withoutBorder: false,
  expanded: false
};

SettingsItem.propTypes = {
  description: PropTypes.string.isRequired,
  withoutBorder: PropTypes.bool,
  onClick: PropTypes.func,
  expanded: PropTypes.bool
};
