import React, { Component } from "react";
import TextInput from "../common/TextInput";
import GeoSuggest from "./GeoSuggest";
import GoogleMapReact from "google-map-react";
import Checkmark from "../navbar/Checkmark";
import GreyDash from "../common/GreyDash";
import Checkbox from "../common/Checkbox";
import Slider from "../common/Slider";
import Thumbler from "../common/Thumbler";  

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
      ],
      isMapExpanded: false,
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
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

  toggleMap = e => {
    this.setState({ isMapExpanded: !this.state.isMapExpanded });
  };

  render() {
    return (
      <form>
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
          className="geo-region-input"
        />
        <GeoSuggest
          suggestions={this.state.suggestions}
          clickHandler={this.geoSuggestionClickHandler}
        />
        <div className="map-expander" onClick={this.toggleMap}>
          Выбрать на карте
          <div className={this.state.isMapExpanded ? "expander-expanded" : ""}>
            <Checkmark />
          </div>
        </div>
        <div
          className={`create-ad-google-map-wrapper ${
            this.state.isMapExpanded ? "map-expanded" : ""
          }`}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCgOW9IW958ZfF3AtgpXToUJjUBGz9MnGU"
            }}
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          />
        </div>
        <GreyDash />
        <div className="create-ad-preferences">
          <Checkbox value="female">Ж</Checkbox>
          <Checkbox value="male">М</Checkbox>
        </div>
        <GreyDash />
        <label className="hint">Человека какого возраста ты ищешь?</label>
        <Slider currentMin="0" currentMax="10" min="0" max="100" double />
        <GreyDash />
        <Thumbler />
      </form>
    );
  }
}
