import React, { Component } from "react";
import "./Profile.css";
import TextInput from "../common/TextInput";
import emptyPhoto from "../../assets/profile/user-regular.svg";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";
import { makeGet, makePost, PROFILE_INFO } from "../../api";
import Popup from "../common/Popup";
import { formDataToObject } from "../../utils/utils";
import Spinner from "../common/Spinner";
import Modal from "../common/Modal";
import { ApplicationContext } from "../../context";

export default class Profile extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      inProgress: false
    };
    this.popup = React.createRef();
  }

  componentWillMount() {
    console.error(this.context);
    this.context.showSpinner();

    makeGet(`/profile?userid=${this.context.getUserId()}`).then(response => {
      const { data: userInfo } = response;
      this.setState({
        userInfo
      });

      if (userInfo.isNewUser) {
        const popup = this.popup.current;
        popup.showPopup(
          <div style={{ textAlign: "center" }}>
            <span>
              <strong>{userInfo.name}, </strong>
              Давай заполним анкету, что бы мы смогли подобрать тебе подходящего
              соседа.
            </span>
            <Button color="btn-green" onClick={() => popup.closePopup()}>
              Приступить
            </Button>
          </div>
        );
      }
    });
    this.context.hideSpinner();
  }

  handleSubmit = e => {
    const rawFormData = formDataToObject(e.target);
    const dataForSending = {
      interests: []
    };

    Object.keys(rawFormData).forEach(key => {
      if (~key.indexOf("like-")) {
        //serialize to list
        dataForSending.interests.push(key.substr(5));
      } else {
        dataForSending[key] = rawFormData[key];
      }
    });

    dataForSending.userId = this.context.getUserId();

    makePost(PROFILE_INFO, JSON.stringify(dataForSending));
    e.preventDefault();
  };

  render() {
    const { name, surname, birthday, phone, inProgress } = this.state.userInfo;

    const { newUser } = this.state;

    if (!name) {
      return (
        <Modal display>
          <Spinner />
        </Modal>
      );
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
          <TextInput
            label="Имя"
            value={name}
            name="name"
            className="profile-data-input"
          />
          <TextInput
            label="Фамилия"
            value={surname}
            name="surname"
            className="profile-data-input"
          />
          <TextInput
            label="Дата рождения"
            value={birthday}
            type="date"
            name="birthday"
            className="profile-data-input"
          />
          <TextInput
            label="Телефон"
            value={phone}
            name="phone"
            className="profile-data-input"
          />
          <div className="profile-about-itself-input">
            <span>О себе</span>
            <div className="profile-interests-select">
              <Checkbox
                value="sport"
                name="like-sport"
                className="profile-interest-item"
              >
                Спорт
              </Checkbox>

              <Checkbox
                value="games"
                name="like-games"
                className="profile-interest-item"
              >
                Игры
              </Checkbox>

              <Checkbox
                value="music"
                name="like-music"
                className="profile-interest-item"
              >
                Музыка
              </Checkbox>

              <Checkbox
                value="books"
                name="like-books"
                className="profile-interest-item"
              >
                книги
              </Checkbox>

              <Checkbox
                value="dance"
                name="like-dance"
                className="profile-interest-item"
              >
                танцы
              </Checkbox>

              <Checkbox
                value="tv"
                name="like-tv"
                className="profile-interest-item"
              >
                TV
              </Checkbox>
            </div>
          </div>
          <div>
            <span>Хочешь рассказать о себе больше?</span>
            <textarea name="description" className="profile-about-itself" />
          </div>
          <Button progress={inProgress} disabled={inProgress} color="btn-green">
            сохранить
          </Button>
        </form>
        <Popup ref={this.popup} />
      </div>
    );
  }
}
