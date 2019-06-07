import React, { Component } from "react";
import Button from "../../common/Button/Button";
import TextInput from "../../common/Input/Input";
import GoogleMapReact from "google-map-react";
import Checkbox from "../../common/Checkbox/Checkbox";
import Thumbler from "../../common/Thumbler/Thumbler";
import NumberInput from "../../common/NumberInput/NumberInput";
import pawIcon from "../../../assets/ad/paw-solid.svg";
import smokingIcon from "../../../assets/ad/smoking-solid.svg";
import femaleIcon from "../../../assets/ad/female-solid.svg";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import maleIcon from "../../../assets/ad/male-solid.svg";
import SelectableItem from "../SelectableItem/SelectableItem";
import Expandable from "../Expandable/Expandable";
import "./CreateAd.scss";

export default class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab || "renter",
      mapExpanded: false
    };
  }

  render() {
    const isLandlord = this.state.activeTab === "landlord";
    const center = { lat: 59.95, lng: 30.33 };

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
            <input
              type="checkbox"
              name="landlord"
              hidden
              checked={isLandlord}
              readOnly
            />
            <div className="ad-geo">
              <TextInput
                value={this.state.geoSuggestion}
                label="город"
                name="place"
                ref={this.geoInputRef}
                className="ad-geo-region-input"
              />
              <Expandable message="Выбрать на карте">
                <div style={{ height: "300px", width: "280px" }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCgOW9IW958ZfF3AtgpXToUJjUBGz9MnGU"
                    }}
                    defaultCenter={center}
                    defaultZoom={11}
                  />
                </div>
              </Expandable>
              <LocationSearchInput/>
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
            <div>
              <span className="hint">Подселю{isLandlord ? "" : "сь"} в:</span>
              <div style={{ display: "inline-block", textAlign: "left" }}>
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
            <hr />

            <Expandable message="Дополнительные удобства">
              <div className="add-conv">
                <SelectableItem name="">Стиральная машина</SelectableItem>
                <SelectableItem name="">Холодильник</SelectableItem>
                <SelectableItem name="">Телевизор</SelectableItem>
                <SelectableItem name="">Интернет</SelectableItem>
                <SelectableItem name="">Посудомоечная машина</SelectableItem>
                <SelectableItem name="">Балкон</SelectableItem>
              </div>
            </Expandable>
            <hr />
            <div>
              <span className="hint">
                Хочу {isLandlord ? "получать" : "платить"} за аренду
              </span>
              <div className="ad-price">
                <NumberInput name="price" label="тыс. ₽" />
              </div>
            </div>
            <hr />
            <span className="hint">Дополнительные комментарии</span>
            <textarea name="description" className="ad-add-info" />
            <Button>Сохранить</Button>
          </form>
        </div>
      </div>
    );
  }
}
