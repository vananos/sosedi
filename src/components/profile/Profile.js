import React, { Component } from "react";
import "./Profile.css";
import TextInput from "../common/TextInput";
import emptyPhoto from "../../assets/profile/user-regular.svg";
import Button from "../common/Button";
import Checkbox from "../common/Checkbox";

export default class Profile extends Component {
  render() {
    const { name, birthday, email, phone } = {
      name: "Иван",
      birthday: "25.05.2019",
      email: "vananos@gmail.com",
      phone: "+7999-208-45-39"
    };
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
          <span className="profile-add-photo">Добавить фото</span>
        </div>
        <form action="">
          <TextInput label="Имя" value={name} className="profile-data-input" />
          <TextInput
            label="Дата рождения"
            value={birthday}
            className="profile-data-input"
          />
          <TextInput
            label="Email"
            value={email}
            className="profile-data-input"
          />
          <TextInput
            label="Телефон"
            value={phone}
            className="profile-data-input"
          />
          <div className="profile-about-itself-input">
            <span>О себе</span>
            <div className="profile-interests-select">
              <Checkbox value="sport" className="profile-interest-item">Спорт</Checkbox>

              <Checkbox value="games" className="profile-interest-item">Игры</Checkbox>

              <Checkbox value="music" className="profile-interest-item">Музыка</Checkbox>

              <Checkbox value="books" className="profile-interest-item">книги</Checkbox>

              <Checkbox value="dance" className="profile-interest-item">танцы</Checkbox>

              <Checkbox value="tv" className="profile-interest-item">TV</Checkbox>
            </div>
          </div>
          <div>
            <span>Хочешь рассказать о себе больше?</span>
            <textarea className="profile-about-itself" />
          </div>
          <Button bordered color="btn-green">
            сохранить
          </Button>
        </form>
      </div>
    );
  }
}
