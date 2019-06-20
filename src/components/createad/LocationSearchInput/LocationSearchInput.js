import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import Input from "../../common/Input/Input";
import "./LocationSearchInput.scss";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.placeId.address,
      selectedGeo: JSON.stringify(props.placeId)
    };
    this.geoInputRef = React.createRef();
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.geoInputRef.current.setValue(address);
    geocodeByAddress(address)
      .then(results => {
        return getLatLng(results[0]);
      })
      .then(latLng =>
        this.setState({
          selectedGeo: JSON.stringify({
            address,
            latLng
          })
        })
      )
      .catch(error => console.error("Error", error));
  };

  render() {
    const errorMsg = this.props.error && this.state.selectedGeo === "{}" && (
      <span className="error-msg">Выберите место из выпадающего списка</span>
    );

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              type="text"
              name="placeId"
              value={this.state.selectedGeo}
              onChange={() => {}}
              hidden
            />
            <Input
              ref={this.geoInputRef}
              value={this.state.address}
              {...getInputProps({
                label: "город",
                className: "ad-geo-region-input"
              })}
            />
            <div className="dropdown-wrapper">
              <div className="autocomplete-dropdown-container">
                {loading && <div>Ищем...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {errorMsg}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
