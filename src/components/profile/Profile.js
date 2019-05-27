import React, { Component } from "react";
import "./Profile.css";
import Input from "../common/Input/Input";
import emptyPhoto from "../../assets/profile/user-regular.svg";
import Button from "../common/Button/Button";
import Checkbox from "../common/Checkbox/Checkbox";
import { extractFormData } from "../../utils/utils";
import { ApplicationContext } from "../../context";
import NotificationManager from "../common/NotificationManager/NotificationManager";

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
    this.context.app.showSpinner();

    this.context.api
      .makeGet(`/profile?userid=${this.context.getUserId()}`)
      .then(response => {
        const { data: userInfo } = response;

        this.setState({
          userInfo
        });

        if (userInfo.isNewUser) {
          this.context.app.showPopup(
            <div style={{ textAlign: "center" }}>
              <span>
                <strong>{userInfo.name}, </strong>
                Давай заполним анкету, что бы мы смогли подобрать тебе
                подходящего соседа.
              </span>
              <Button color="btn-green">Приступить</Button>
            </div>
          );
        }
      })
      .finally(() => this.context.app.hideSpinner());
  }

  handleSubmit = e => {
    const rawFormData = extractFormData(e.target);
    const serialaizedProfileData = {
      interests: []
    };

    Object.keys(rawFormData).forEach(key => {
      if (~key.indexOf("like-")) {
        //serialize interests to list
        serialaizedProfileData.interests.push(rawFormData[key]);
      } else {
        serialaizedProfileData[key] = rawFormData[key];
      }
    });

    serialaizedProfileData.userId = this.context.getUserId();

    this.setState({ inProgress: true });

    this.context.api
      .updateProfile(serialaizedProfileData)
      .then(res => {
        NotificationManager.notify(
          <span style={{ textAlign: "center" }}>
            Данные успешно обновлены!
          </span>,
          {
            duration: 1000
          }
        );
      })
      .finally(() => this.setState({ inProgress: false }));
    e.preventDefault();
  };

  render() {
    const {
      userId,
      name,
      surname,
      birthday,
      phone,
      description,
      inProgress,
      interests
    } = this.state.userInfo;

    if (!userId) {
      return null;
    }
    return (
      <div className="profile">
        <div className="profile-greeting">
          <span>Привет, {name}</span>
        </div>
        <div className="profile-logo">
          <div className="profile-logo-background">
            <div className="profile-logo-frame">
              <img
                src={emptyPhoto}
                width="91"
                height="104"
                alt={`фотография ${name}`}
                className="profile-logo-img"
              />
            </div>
          </div>
          <span className="profile-add-photo">Изменить фото</span>
        </div>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Имя"
            value={name}
            name="name"
            className="profile-data-input"
          />
          <Input
            label="Фамилия"
            value={surname}
            name="surname"
            className="profile-data-input"
          />
          <Input
            label="Дата рождения"
            value={birthday}
            type="date"
            name="birthday"
            className="profile-data-input"
          />
          <Input
            label="Телефон"
            value={phone}
            name="phone"
            className="profile-data-input"
          />
          <div className="profile-about-itself-input">
            <span>О себе</span>
            <div className="profile-interests-select">
              {this.availableInterests().map(interest => (
                <Checkbox
                  value={interest.name}
                  name={`like-${interest.name}`}
                  className="profile-interest-item"
                  checked={interests.includes(interest.name)}
                >
                  {interest.description}
                </Checkbox>
              ))}
            </div>
          </div>
          <div>
            <span>Хочешь рассказать о себе больше?</span>
            <textarea
              name="description"
              className="profile-about-itself"
              defaultValue={description}
            />
          </div>
          <Button progress={inProgress} disabled={inProgress} color="btn-green">
            сохранить
          </Button>
        </form>
      </div>
    );
  }
}
