import React, { Component } from "react";
import "./Profile.css";
import TextInput from "../common/TextInput";
import emptyPhoto from "../../assets/profile/user-regular.svg";
// import infoCircle from "../../assets/common/info-circle-solid.svg";
import Button from "../common/Button";

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
              <InterestCheckbox value="sport">Спорт</InterestCheckbox>

              <InterestCheckbox value="games">Игры</InterestCheckbox>

              <InterestCheckbox value="music">Музыка</InterestCheckbox>

              <InterestCheckbox value="books">книги</InterestCheckbox>

              <InterestCheckbox value="dance">танцы</InterestCheckbox>

              <InterestCheckbox value="tv">TV</InterestCheckbox>
            </div>
          </div>
          <div>
            <span>Хочешь рассказать о себе больше?</span>
            <textarea className="profile-about-itself" />
          </div>
          <Button bordered color="btn-green">сохранить</Button>
        </form>
      </div>
    );
  }
}

class InterestCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.checked
    };
  }

  changeState = () => {
    this.setState({
      selected: !this.state.selected
    });
  };

  render() {
    const { value, id, name, className, children } = this.props;
    return (
      <div className="profile-interest-wrapper">
        <div
          className={`profile-interest-checkbox ${className ? className : ""} ${
            this.state.selected ? "profile-interest-selected" : ""
          }`}
          onClick={this.changeState}
        >
          <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={this.state.checked}
          />
          <span>{children}</span>
        </div>
      </div>
    );
  }
}
