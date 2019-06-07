import React, { Component } from "react";
import Button from "../../common/Button/Button";
import TextInput from "../../common/Input/Input";
import GoogleMapReact from "google-map-react";
import Checkmark from "../../navbar/Checkmark/Checkmark";
import Checkbox from "../../common/Checkbox/Checkbox";
import Thumbler from "../../common/Thumbler/Thumbler";
import NumberInput from "../../common/NumberInput/NumberInput";
import pawIcon from "../../../assets/ad/paw-solid.svg";
import smokingIcon from "../../../assets/ad/smoking-solid.svg";
import femaleIcon from "../../../assets/ad/female-solid.svg";
import maleIcon from "../../../assets/ad/male-solid.svg";
import SelectableItem from "../SelectableItem/SelectableItem";
import "./CreateAd.scss";

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "renter"
    };
  }

  render() {
    const isLandlord = this.state.activeTab === "landlord";
    return (
      <div className="ad">
        <div>
          <div className="ad-header">
            <div className="ad-toggler">
              <Button
                color={isLandlord ? "disabled" : "yellow"}
                onClick={_ => this.setState({ activeTab: "renter" })}
              >
                Подселюсь
              </Button>
              <Button
                color={isLandlord ? "yellow" : "disabled"}
                onClick={_ => this.setState({ activeTab: "landlord" })}
              >
                Подселю
              </Button>
            </div>
          </div>
          <hr />
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
                  className={
                    this.state.isMapExpanded ? "expander-expanded" : ""
                  }
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
                <img
                  src={smokingIcon}
                  alt="smoking"
                  width="50px"
                  height="50px"
                />
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
              <NumberInput name="age-min" label="min" min="0" max="100" />
              <NumberInput name="age-max" label="max" min="0" max="100" />
            </div>
            <hr />
            <div style={{textAlign: "center"}}>
              <label className="hint">Подселю{isLandlord ? "" : "сь"} в:</label>
              <div style={{display: "inline-block", textAlign: "left"}}>
                <SelectableItem name="room" className="ad-room-type">
                  комнату
                </SelectableItem>
                <SelectableItem name="flat1" className="ad-room-type">
                  1к. квартиру
                </SelectableItem>
                <SelectableItem name="flat2" className="ad-room-type">
                  2к. квартиру
                </SelectableItem>
                <SelectableItem name="flat3" className="ad-room-type">
                  3к. квартиру
                </SelectableItem>
                <SelectableItem name="flat4" className="ad-room-type">
                  4к. квартиру
                </SelectableItem>
                <SelectableItem name="flat5" className="ad-room-type">
                  5+к. квартиру
                </SelectableItem>
              </div>
            </div>
            <span className="hint">
              Хочу {isLandlord ? "получать" : "платьить"} за аренду
            </span>
            <Button>Сохранить</Button>
          </form>
        </div>
      </div>
    );
  }
}
