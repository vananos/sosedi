import React, { Component } from "react";
import "./Profile.scss";
import Input from "../common/Input/Input";
import emptyPhoto from "../../assets/profile/user-regular.svg";
import Button from "../common/Button/Button";
import SquareCheckbox from "../common/SquareCheckbox/SquareCheckbox";
import {
  extractFormData,
  validateFormData,
  Validators,
  PHONE_MASK
} from "../../utils/utils";
import NotificationManager from "../common/NotificationManager/NotificationManager";
import Modal from "../common/Modal/Modal";
import ChangePhotoDialog from "./ChangePhotoDialog/ChangePhotoDialog";
import { ApplicationContext } from "../../context";
import { API_GATEWAY } from "../../api";
import Radio from "../common/SelectableInputs/Radio";

export default class Profile extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      inProgress: false
    };
  }

  availableInterests = () => [
    {
      name: "sport",
      description: "Спорт",
      selected: false
    },
    {
      name: "music",
      description: "Музыка",
      selected: false
    },
    {
      name: "games",
      description: "Игры",
      selected: false
    },
    {
      name: "tv",
      description: "TV",
      selected: false
    },
    {
      name: "books",
      description: "Книги",
      selected: false
    },
    {
      name: "dance",
      description: "Танцы",
      selected: false
    }
  ];

  componentWillMount() {
    this.context.withUserInfo(userInfo => {
      Modal.showSpinner();

      this.context.api
        .getProfileInfo(userInfo.userId)
        .ifSuccess(response => {
          const { data: userInfo } = response;

          this.setState(
            {
              userInfo
            },
            () => {
              if (userInfo.isNewUser) {
                this.showGreetingsForNewUser(userInfo.name);
              }
            }
          );
        })
        .execute()
        .finally(() => this.state.userInfo.isNewUser || Modal.hide());
    });
  }

  showGreetingsForNewUser = name => {
    Modal.showPopup(
      <div style={{ textAlign: "center" }}>
        <span>
          <strong>{name}, </strong>
          Давай заполним анкету, что бы мы смогли подобрать тебе подходящего
          соседа.
        </span>
        <Button style={{ marginTop: "25px" }}>Приступить</Button>
      </div>
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    const rawFormData = extractFormData(e.target);
    const validationResult = validateFormData(rawFormData, Validators);

    if (validationResult.hasErrors()) {
      this.setState({
        errors: validationResult.errors
      });
      NotificationManager.notify("Пожалуйста, проверьте заполнение формы", {
        type: "error"
      });
      return;
    }

    const serialaizedProfileData = this.serializeProfileFormData(rawFormData);

    serialaizedProfileData.userId = this.context.withUserInfo(
      userInfo => userInfo.userId
    );

    this.setState({ inProgress: true });

    this.context.api
      .updateProfileInfo(serialaizedProfileData)
      .ifSuccess(res => {
        NotificationManager.notify(
          <span style={{ textAlign: "center" }}>
            Данные успешно обновлены!
          </span>,
          {
            duration: 1000
          }
        );
      })
      .execute()
      .finally(() => this.setState({ inProgress: false }));
  };

  serializeProfileFormData = rawFormData => {
    const serialaizedProfileData = {
      interests: []
    };

    Object.keys(rawFormData).forEach(key => {
      if (~key.indexOf("like-")) {
        //serialize interests to list
        serialaizedProfileData.interests.push(rawFormData[key].toUpperCase());
      } else {
        serialaizedProfileData[key] = rawFormData[key];
      }
    });
    return serialaizedProfileData;
  };

  newAvatarCallback = name => {
    Modal.hide();
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        avatar: name
      }
    });
  };

  maskPhone = (event, input) => {
    const newValue = event.target.value;
    let result;

    if (newValue.length < input.state.value.length) {
      result = newValue;
    } else {
      const maxPhoneLength = 11;
      const maskedValue = PHONE_MASK;
      const digits = [];
      let i = 0;
      for (let c of newValue) {
        if (c >= "0" && c <= "9") {
          digits.push(c);
          i++;
        }
        if (i >= maxPhoneLength) break;
      }
      if (!digits.length) {
        return;
      }
      result = maskedValue.replace(/#/g, _ => digits.shift() || " ").trim();
      if (result[result.length - 1] === ")") {
        result = result.replace(")", "");
      }
    }
    input.setValue(result.trim());
    return false;
  };

  render() {
    const {
      userInfo: {
        userId,
        name,
        surname,
        birthday,
        phone,
        avatar,
        description,
        inProgress,
        interests,
        gender
      },
      errors = {}
    } = this.state;
    if (!userId) {
      return null;
    }

    let effectiveGender = gender === null ? "ANY" : gender;

    return (
      <div className="profile">
        <div className="profile-greeting">
          <span>Привет, {name}</span>
        </div>
        <div className="profile-logo">
          <div className="profile-logo-background">
            <div className="profile-logo-frame">
              {avatar ? (
                <img
                  src={`${API_GATEWAY}/img/${avatar}`}
                  width="180"
                  height="180"
                  alt={`фотография ${name}`}
                  className="profile-logo-img"
                />
              ) : (
                <img
                  src={emptyPhoto}
                  width="91"
                  height="104"
                  alt={`фотография ${name}`}
                />
              )}
            </div>
          </div>
          <span
            className="profile-change-photo"
            onClick={() =>
              Modal.showPopup(
                <ChangePhotoDialog
                  context={this.context}
                  newAvatarCallback={this.newAvatarCallback}
                  savedImage={this.state.userInfo.avatar}
                />
              )
            }
          >
            Изменить фото
          </span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <section>
            <Input
              label="Имя"
              value={name}
              name="name"
              error={errors.name}
              className="profile-data-input"
            />
            <Input
              label="Фамилия"
              value={surname}
              name="surname"
              error={errors.surname}
              className="profile-data-input"
            />
            <div>
              <label>Пол:</label>
              {[
                ["MALE", "Мужской"],
                ["FEMALE", "Женский"],
                ["ANY", "Не указан"]
              ].map(radioData => (
                <Radio
                  key={radioData[0]}
                  name="gender"
                  value={radioData[0]}
                  type="radio"
                  className="profile-gender-select"
                  checked={effectiveGender === radioData[0]}
                >
                  {radioData[1]}
                </Radio>
              ))}
            </div>
            <Input
              label="Дата рождения"
              value={birthday}
              type="date"
              name="birthday"
              error={errors.birthday}
              className="profile-data-input"
              max={new Date().toISOString().split("T")[0]}
            />
            <Input
              label="Телефон"
              value={phone}
              name="phone"
              onChange={this.maskPhone}
              type="tel"
              error={errors.phone}
              className="profile-data-input"
            />
          </section>
          <section className="profile-about-itself-input">
            <span>О себе</span>
            <div className="profile-interests-select">
              {this.availableInterests().map(interest => (
                <div className="profile-interest-item" key={interest.name}>
                  <SquareCheckbox
                    value={interest.name}
                    name={`like-${interest.name}`}
                    checked={
                      interests &&
                      interests.includes(interest.name.toUpperCase())
                    }
                  >
                    {interest.description}
                  </SquareCheckbox>
                </div>
              ))}
            </div>
            <span>Хочешь рассказать о себе больше?</span>
            <textarea
              name="description"
              className="profile-about-itself"
              defaultValue={description}
            />
          </section>
          <Button progress={inProgress} disabled={inProgress}>
            сохранить
          </Button>
        </form>
      </div>
    );
  }
}
