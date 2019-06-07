import React, { Component } from "react";
import TextInput from "../../common/Input/Input";
import GeoSuggest from "../GeoSuggest/GeoSuggest";
import GoogleMapReact from "google-map-react";
import Checkmark from "../../navbar/Checkmark/Checkmark";
import Checkbox from "../../common/Checkbox/Checkbox";
import Thumbler from "../../common/Thumbler/Thumbler";
import Button from "../../common/Button/Button";
import NumberInput from "../../common/NumberInput/NumberInput";
import pawIcon from "../../../assets/ad/paw-solid.svg";
import smokingIcon from "../../../assets/ad/smoking-solid.svg";
import femaleIcon from "../../../assets/ad/female-solid.svg";
import maleIcon from "../../../assets/ad/male-solid.svg";
import Input from "../../common/Input/Input";

export default class CreateLandlordAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapExpanded: false,
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
    };
    this.geoInputRef = React.createRef();
    this.minDate = React.createRef();
    this.maxDate = React.createRef();
  }

  toggleMap = e => {
    this.setState({ isMapExpanded: !this.state.isMapExpanded });
  };

  render() {
    const today = () => new Date().toISOString().split("T")[0];

    return (
      <form>
        <div className="ad-geo">
          <TextInput
            value={this.state.geoSuggestion}
            label="город"
            name="place"
            ref={this.geoInputRef}
            className="ad-geo-region-input"
          />
          <div className="map-expander" onClick={this.toggleMap}>
            Выбрать на карте
            <div
              className={this.state.isMapExpanded ? "expander-expanded" : ""}
            >
              <Checkmark />
            </div>
          </div>
          <div
            className={`ad-google-map-wrapper ${
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
        </div>
        <hr />
        <div className="ad-preferences">
          <Checkbox value="female" name="female" checked size={96}>
            <img src={femaleIcon} alt="female" width="50px" height="50px" />
          </Checkbox>
          <Checkbox value="male" name="male" checked size={96}>
            <img src={maleIcon} alt="male" width="50px" height="50px" />
          </Checkbox>
        </div>
        <div className="ad-preferences">
          <Thumbler>
            <img src={smokingIcon} alt="smoking" width="50px" height="50px" />
          </Thumbler>
        </div>
        <div className="ad-preferences">
          <Thumbler>
            <img src={pawIcon} alt="smoking" width="50px" height="50px" />
          </Thumbler>
        </div>
        <hr />
        <label className="hint">Человека какого возраста ты ищешь?</label>
        <div className="ad-age-select">
            <NumberInput name="age-min" label="min" />
            <NumberInput name="age-max" label="max" />
        </div>
        <hr />
        <div className="ad-rent-period">
          <span>Я готов сдавать жилье</span>
          <div>
            <div>
              <Input
                name="start"
                label="с"
                type="date"
                min={today()}
                ref={this.minDate}
                className="ad-rent-period-input"
              />
              <Button
                color="yellow"
                onClick={e => {
                  this.minDate.current.setValue(today());
                  e.preventDefault();
                }}
              >
                сейчас
              </Button>
            </div>
            <div>
              <Input
                name="end"
                label="по"
                type="date"
                min={today()}
                className="ad-rent-period-input"
                onClick={e => {
                  this.minDate.current.setValue({
                    value: today()
                  });
                  e.preventDefault();
                }}
              />
              <Button color="yellow">без ограничений</Button>
            </div>
          </div>
        </div>
        <span className="hint">Количество людей в квартире</span>
        <span className="hint">Хочу платить за аренду</span>
        <Button>Сохранить</Button>
      </form>
    );
  }
}
