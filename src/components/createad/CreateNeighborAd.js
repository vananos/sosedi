import React, { Component } from "react";
import TextInput from "../common/TextInput";
import GeoSuggest from "./GeoSuggest";

export default class CreateNeighborAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoSuggestion: "",
      suggestions: [],
      suggestionListFull: [
        { value: "Питер", id: 0 },
        { value: "Пивер", id: 1 },
        { value: "Пикер", id: 2 }
      ]
    };
    this.geoInputRef = React.createRef();
  }

  geoSuggestionClickHandler = (e, suggestionId) => {
    const newValue = this.state.suggestionListFull.filter(
      item => item.id === suggestionId
    )[0].value;
    this.setState({
      geoSuggestion: newValue,
      suggestions: []
    });
    this.geoInputRef.current.setValue(newValue);
  };

  render() {
    return (
      <div>
        <TextInput
          value={this.state.geoSuggestion}
          label="город"
          ref={this.geoInputRef}
          onChange={e => {
            const newValue = e.target.value;
            this.setState({
              geoSuggestion: newValue,
              suggestions:
                newValue === ""
                  ? []
                  : this.state.suggestionListFull.filter(suggestion =>
                      suggestion.value
                        .toLowerCase()
                        .includes(newValue.toLowerCase())
                    )
            });
          }}
        />
        <GeoSuggest
          suggestions={this.state.suggestions}
          clickHandler={this.geoSuggestionClickHandler}
        />
      </div>
    );
  }
}
