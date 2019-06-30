import React, { Component } from "react";
import Button from "../../common/Button/Button";
import GoogleMapReact from "google-map-react";
import SquareCheckbox from "../../common/SquareCheckbox/SquareCheckbox";
import Thumbler from "../../common/Thumbler/Thumbler";
import NumberInput from "../../common/NumberInput/NumberInput";
import pawIcon from "../../../assets/ad/paw-solid.svg";
import smokingIcon from "../../../assets/ad/smoking-solid.svg";
import femaleIcon from "../../../assets/ad/female-solid.svg";
import maleIcon from "../../../assets/ad/male-solid.svg";
import Checkbox from "../../common/SelectableInputs/Checkbox";
import Expandable from "../../common/Expandable/Expandable";
import { ApplicationContext } from "../../../context";
import browserHistory from "../../../browserHistory";
import {
  extractFormData,
  validateFormData,
  Validators,
  roomTypeName,
  conveniencesName
} from "../../../utils/utils";
import NotificationManager from "../../common/NotificationManager/NotificationManager";
import "./Ad.scss";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import Modal from "../../common/Modal/Modal";
import Textarea from "../../common/Textarea/Textarea";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

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
      waitServer: false,
      empty: false,
      errors: {}
    };

    this.minAgeRef = React.createRef();
    this.maxAgeRef = React.createRef();
  }

  getDefaultAdInfo = () => ({
    userId: this.context.withUserInfo(userInfo => userInfo.userId),
    conveniences: [],
    roomType: [],
    landlord: true,
    gender: "ANY",
    minAge: 16,
    maxAge: 85,
    rentPay: 15,
    placeId: {}
  });

  componentWillMount() {
    this.context.withUserInfo(userInfo => {
      Modal.showSpinner();
      this.context.api
        .getUserAd(userInfo.userId)
        .ifSuccess(res => {
          const adInfo = res.data;
          if (!adInfo.conveniences) {
            adInfo.conveniences = [];
          }
          if (adInfo.landlord === null) {
            adInfo.landlord = this.state.landlord;
          }
          adInfo.animals = attitudeConveter.getFromAttitudeValue(
            adInfo.animals
          );
          adInfo.smoking = attitudeConveter.getFromAttitudeValue(
            adInfo.smoking
          );
          this.setState({ adInfo });
        })
        .ifNotFound(() => {
          this.setState({ adInfo: this.getDefaultAdInfo(), empty: true });
          Modal.showPopup(
            <span>
              Давай заполним объявление, что бы мы могли найти тебе соседа
              <Button style={{ marginTop: "25px" }}>Приступить</Button>
            </span>
          );
        })
        .execute()
        .finally(() => this.state.empty || Modal.hide());
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const formData = extractFormData(e.target);

    const serializedForm = this.getDefaultAdInfo();

    let genderCounter = 0;

    for (let key of Object.keys(formData)) {
      if (["animals", "smoking"].some(item => item === key)) {
        serializedForm[key] = attitudeConveter.getFromThumblerValue(
          formData[key]
        );
      } else if (key.includes("-")) {
        const [prefix, value] = key.split("-");
        serializedForm[prefix].push(value.toUpperCase());
      } else if (key === "placeId") {
        serializedForm[key] = JSON.parse(formData[key]);
      } else {
        serializedForm[key] = formData[key];
      }
      if (key === "male" || key === "female") {
        genderCounter++;
        serializedForm["gender"] =
          genderCounter == 2 ? "ANY" : key.toUpperCase();
      }
    }

    const validationResult = validateFormData(formData, Validators);
    if (
      validationResult.hasErrors() ||
      !serializedForm["roomType"] ||
      serializedForm["roomType"].length === 0
    ) {
      NotificationManager.notify("Проверьте правильность заполнения формы", {
        type: "error"
      });

      validationResult.errors.roomType = {
        error: "Необходимо выбрать тип размещения"
      };

      this.setState({ errors: validationResult.errors });
      return;
    }

    this.setState({ waitServer: true });

    this.context.api
      .updateUserAd(serializedForm)
      .ifSuccess(res => {
        if (this.state.empty) {
          window.scrollTo(0, 0);

          NotificationManager.notify(
            "Изменения успешно сохранены, мы уже начали искать тебе соседа."
          );
          browserHistory.push("/matching");
        } else {
          NotificationManager.notify("Изменения успешно сохранены");
        }
      })
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
      gender,
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

    const female = ["ANY", "FEMALE"].includes(gender);
    const male = ["ANY", "MALE"].includes(gender);

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
              <input type="hidden" name="landlord" value={"" + landlord} />
            </div>
          </div>
          <section>
            <div className="ad-geo">
              <LocationSearchInput
                placeId={placeId}
                error={this.state.errors.placeId}
              />
            </div>
          </section>
          <section>
            <header>Соседа какого пола ты ищешь?</header>
            <div className="gender-preferences">
              <SquareCheckbox
                value="female"
                name="female"
                size={96}
                checked={female}
              >
                <img src={femaleIcon} alt="female" width="50px" height="50px" />
              </SquareCheckbox>
              <SquareCheckbox value="male" name="male" size={96} checked={male}>
                <img src={maleIcon} alt="male" width="50px" height="50px" />
              </SquareCheckbox>
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
              />
              <NumberInput
                name="maxAge"
                label="max"
                min="0"
                max="100"
                ref={this.maxAgeRef}
                value={+maxAge}
              />
            </div>
          </section>
          <section>
            <header>Подселю{landlord ? "" : "сь"} в:</header>
            <div className="ad-room-type-select">
              {roomTypeName.map(type => (
                <Checkbox
                  key={type[0]}
                  name={`roomType-${type[0]}`}
                  className="ad-room-type"
                  checked={roomType.includes(type[0].toUpperCase())}
                >
                  {type[1]}
                </Checkbox>
              ))}
            </div>
            {this.state.errors.roomType && (
              <div className="error" style={{ textAlign: "center" }}>
                {this.state.errors.roomType.error}
              </div>
            )}
          </section>

          <Expandable message="Дополнительные удобства">
            <div className="add-conv">
              {conveniencesName.map(type => {
                return (
                  <Checkbox
                    name={`conveniences-${type[0]}`}
                    key={type[0]}
                    checked={conveniences.includes(type[0].toUpperCase())}
                  >
                    {type[1]}
                  </Checkbox>
                );
              })}
            </div>
          </Expandable>
          <section>
            <header className="hint">
              Хочу {landlord ? "получать" : "платить"} за аренду
            </header>
            <div className="ad-price">
              <NumberInput name="rentPay" value={+rentPay} label="тыс. ₽" />
            </div>
          </section>
          <section>
            <header>Дополнительные комментарии</header>
            <Textarea
              name="description"
              className="ad-add-info"
              defaultValue={description}
              maxlen={512}
            />
          </section>
          <Button disable={waitServer} progress={waitServer}>
            Сохранить
          </Button>
        </form>
      </div>
    );
  }
}
