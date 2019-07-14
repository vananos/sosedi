import React, { Component } from "react";
import "./Main.scss";
import logo from "../../assets/logo_up.svg";
import Button from "../common/Button/Button";
import browserHistory from "../../browserHistory";

export default class Main extends Component {
  render() {
    return (
      <div className="landing">
        <div className="landing-first-slide">
          <img src={logo} className="landing-first-slide-logo" />
          <span>Ищешь подходящего человека для совместного проживания?</span>
          <div className="landing-first-slide-first-img" />
          <h2>Ты не одинок!</h2>
          <span className="landing-first-slide-desc">
            Огромное количество людей в этот самый момент желают найти именно
            такого сожителя как ты!
          </span>
        </div>
        <div className="landing-second-slide" />
        <div className="landing-third-slide">
          <span>
            Наше приложение создано специально для того, чтобы помочь вам найти
            друг друга!
          </span>
        </div>
        <div className="landing-fourth-slide">
          <ul>
            <li>Зарегистрируйся</li>
            <li>Расскажи о себе, заполнив короткую анкету</li>
            <li>Выбери понравившегося кандидата</li>
          </ul>
        </div>

        <h2 className="landing-slogan">
          Найди своего идеального соседа прямо сейчас
        </h2>

        <Button
          className="landing-start"
          color="yellow"
          onClick={() => browserHistory.push("/login")}
        >
          Начать
        </Button>
      </div>
    );
  }
}
