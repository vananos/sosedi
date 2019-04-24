import React, { Component } from "react";
import "./GeoSuggest.css";

export default class GeoSuggest extends Component {
  render() {
    const { clickHandler, suggestions } = this.props;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <div className="geo-suggest-wrapper">
        <div className="create-ad-geo-suggest-list">
          {suggestions.map(suggesion => (
            <div className="create-ad-geo-suggest"  onClick={e => clickHandler(e, suggesion.id)} key={suggesion.id}>
              {suggesion.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
