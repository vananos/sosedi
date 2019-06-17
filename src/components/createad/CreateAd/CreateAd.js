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
import maleIcon from "../../../assets/ad/male-solid.svg";
import SelectableItem from "../SelectableItem/SelectableItem";
import Expandable from "../Expandable/Expandable";
import { ApplicationContext } from "../../../context";
import { extractFormData } from "../../../utils/utils";
import NotificationManager from "../../common/NotificationManager/NotificationManager";
import "./CreateAd.scss";
import Modal from "../../common/Modal/Modal";

const attitudeConveter = {
  thumblerToAttitude: [["no", "BAD"], ["yes", "GOOD"], ["default", "NEUTRAL"]],

  getFromThumblerValue: function(value) {
    return this.thumblerToAttitude.find(val => val[0] === value)[1];
  },

  getFromAttitudeValue: function(value) {
    return this.thumblerToAttitude.find(val => val[1] === value)[0];
  }
};

export default class CreateAd extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      mapExpanded: false,
      waitServer: false,
      empty: false
    };

    this.minAgeRef = React.createRef();
    this.maxAgeRef = React.createRef();
  }

  getDefaultAdInfo = () => ({
    userId: this.context.getUserId(),
    conveniences: [],
    roomType: [],
    landlord: this.state.adInfo && this.state.adInfo.landlord,
    male: false,
    female: false,
    minAge: 16,
    maxAge: 85
  });

  componentWillMount() {
    Modal.showSpinner();
    this.context.api
      .getUserAd(this.context.getUserId())
      .ifSuccess(res => {
        const adInfo = res.data;
        if (!adInfo.conveniences) {
          adInfo.conveniences = [];
        }
        if (!adInfo.landlord) {
          adInfo.landlord = this.state.landlord;
        }
        adInfo.animals = attitudeConveter.getFromAttitudeValue(adInfo.animals);
        adInfo.smoking = attitudeConveter.getFromAttitudeValue(adInfo.smoking);
        this.setState({ adInfo });
      })
      .ifNotFound(() => {
        this.setState({ adInfo: this.getDefaultAdInfo(), empty: true });
        Modal.showPopup(
          <span>
            Давай заполним объявление, что бы мы могли найти тебе соседа
          </span>
        );
      })
      .execute()
      .finally(() => this.state.empty || Modal.hide());
  }

  handleSubmit = e => {
    e.preventDefault();

    const formData = extractFormData(e.target);
    const serializedForm = this.getDefaultAdInfo();
    for (let key of Object.keys(formData)) {
      if (key.includes("male")) {
        serializedForm[key] = true;
      } else if (["animals", "smoking"].some(item => item === key)) {
        console.log(formData[key]);
        serializedForm[key] = attitudeConveter.getFromThumblerValue(
          formData[key]
        );
      } else if (key.includes("-")) {
        const [prefix, value] = key.split("-");
        serializedForm[prefix].push(value.toUpperCase());
      } else {
        serializedForm[key] = formData[key];
      }
    }

    this.setState({ waitServer: true });

    this.context.api
      .updateProfileInfo(serializedForm)
      .ifSuccess(res =>
        NotificationManager.notify("Изменения успешно сохранены")
      )
      .ifBadRequest(r => console.log(r))
      .execute()
      .finally(() => this.setState({ waitServer: false }));
  };

  render() {
    const { waitServer } = this.state;

    if (!this.state.adInfo) {
      return null;
    }

    const {
      placeId,
      female,
      male,
      smoking,
      animals,
      minAge,
      maxAge,
      roomType,
      conveniences,
      rentPay,
      description,
      landlord
    } = this.state.adInfo;

    const center = { lat: 59.95, lng: 30.33 };
    return (
      <div className="ad">
        <form onSubmit={this.handleSubmit}>
          <div className="ad-header">
            <div className="ad-toggler">
              <Button
                color={landlord ? "disabled" : "yellow"}
                onClick={e => {
                  const adInfo = this.state.adInfo;
                  adInfo.landlord = false;
                  this.setState({ adInfo });
                  e.preventDefault();
                }}
              >
                Подселюсь
              </Button>
              <Button
                color={landlord ? "yellow" : "disabled"}
                onClick={e => {
                  const adInfo = this.state.adInfo;
                  adInfo.landlord = true;
                  this.setState({ adInfo });
                  e.preventDefault();
                }}
              >
                Подселю
              </Button>
            </div>
          </div>
          <section>
          <div className="ad-geo">
            <TextInput
              value={this.state.geoSuggestion}
              label="город"
              name="placeId"
              value={placeId}
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
          </div>
          </section>
          <section>
            <header>Соседа какого пола ты ищешь?</header>
            <div className="gender-preferences">
            <Checkbox value="female" name="female" size={96} checked={female}>
              <img src={femaleIcon} alt="female" width="50px" height="50px" />
            </Checkbox>
            <Checkbox value="male" name="male" size={96} checked={male}>
              <img src={maleIcon} alt="male" width="50px" height="50px" />
            </Checkbox>
            </div>
          </section>
          <section>
            <header>Укажи свое отношение?</header>
            <div className="ad-preferences">
              <Thumbler name="smoking" targetState={smoking}>
                <img
                  src={smokingIcon}
                  alt="smoking"
                  width="50px"
                  height="50px"
                />
              </Thumbler>
            </div>
            <div className="ad-preferences">
              <Thumbler name="animals" targetState={animals}>
                <img src={pawIcon} alt="animals" width="50px" height="50px" />
              </Thumbler>
            </div>
          </section>
          <section>
            <header>Человека какого возраста ты ищешь?</header>
            <div className="ad-age-select">
              <NumberInput
                name="minAge"
                label="min"
                min="0"
                max="100"
                value={+minAge}
                ref={this.minAgeRef}
                customValueValidator={value =>
                  value < this.maxAgeRef.current.getValue()
                }
              />
              <NumberInput
                name="maxAge"
                label="max"
                min="0"
                max="100"
                ref={this.maxAgeRef}
                value={+maxAge}
                customValueValidator={value =>
                  value > this.minAgeRef.current.getValue()
                }
              />
            </div>
          </section>
          <section>
            <header>Подселю{landlord ? "" : "сь"} в:</header>
            <div className="ad-room-type-select">
              {[
                ["room", "комнату"],
                ["studio", "студию"],
                ["single", "1к. квартиру"],
                ["double", "2к. квартиру"],
                ["three", "3к. квартиру"],
                ["four", "4к. квартиру"]
              ].map(type => (
                <SelectableItem
                  key={type[0]}
                  name={`roomType-${type[0]}`}
                  className="ad-room-type"
                  checked={roomType.includes(type[0].toUpperCase())}
                >
                  {type[1]}
                </SelectableItem>
              ))}
            </div>
          </section>

          <Expandable message="Дополнительные удобства">
            <div className="add-conv">
              {[
                ["washer", "Стиральная машина"],
                ["fridge", "Холодильник"],
                ["tv", "Телевизор"],
                ["internet", "Интернет"],
                ["dishwasher", "Посудомоечная машина"],
                ["gallery", "Балкон"]
              ].map(type => {
                console.log(conveniences);
                return (
                  <SelectableItem
                    name={`conveniences-${type[0]}`}
                    key={type[0]}
                    checked={conveniences.includes(type[0].toUpperCase())}
                  >
                    {type[1]}
                  </SelectableItem>
                );
              })}
            </div>
          </Expandable>
          <div>
            <span className="hint">
              Хочу {landlord ? "получать" : "платить"} за аренду
            </span>
            <div className="ad-price">
              <NumberInput name="rentPay" value={+rentPay} label="тыс. ₽" />
            </div>
          </div>
          <span className="hint">Дополнительные комментарии</span>
          <textarea
            name="description"
            className="ad-add-info"
            defaultValue={description}
          />
          <Button disable={waitServer} progress={waitServer}>
            Сохранить
          </Button>
        </form>
      </div>
    );
  }
}
