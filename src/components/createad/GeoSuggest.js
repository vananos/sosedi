import React, { Component } from "react";
import "./GeoSuggest.css";

export default class GeoSuggest extends Component {
  render() {
    const { clickHandler, suggestions } = this.props;
    if(suggestions.length === 0) {
        return null;
    }
    return (
      <div className="create-ad-geo-suggest-list" onClick={clickHandler}>
        {suggestions.map(suggesion => (
          <div className="create-ad-geo-suggest" key={suggesion.id}>
            {suggesion.value}
          </div>
        ))}
      </div>
    );
  }
}
