import React, { Component } from "react";
import { ApplicationContext } from "../../context";
import Modal from "../common/Modal/Modal";
import { API_GATEWAY } from "../../api";
import "./MatchingPage.scss";
import Checkmark from "../common/Checkmark/Checkmark";
import pawIcon from "../../assets/ad/paw-solid.svg";
import smokingIcon from "../../assets/ad/smoking-solid.svg";
import SquareCheckbox from "../common/SquareCheckbox/SquareCheckbox";
import Checkbox from "../common/SelectableInputs/Checkbox";
import { roomTypeName, conveniencesName } from "../../utils/utils";
import { throws } from "assert";

export default class MatchingPage extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      currentMatch: 0
    };
    this.matches = [];
  }

  componentDidMount() {
    Modal.showSpinner();
    this.loadMatchesFromServer().finally(() => {
      this.setState({ loaded: true });
      Modal.hide();
    });
  }

  getNextMatch = () => {
    if (this.matches.length <= 1) {
      this.loadMatchesFromServer();
    }
    return this.matches.shift();
  };

  loadMatchesFromServer = () => {
    const result = this.context.withUserInfo(userInfo => {
      return this.context.api
        .getMatches(userInfo.userId)
        .ifSuccess(res => {
          this.matches = [...this.matches, ...res.data];
        })
        .execute();
    });

    return result ? result : Promise.resolve();
  };

  setMatchStatus = matchUpdateRequest => {
    this.context.api.updateMatch(matchUpdateRequest).execute();
  };

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const currentMatch = this.getNextMatch();
    if (!currentMatch) {
      return <div>Пока совпадений нет</div>;
    }

    const { userInfo, adInfo } = currentMatch;
    const matchUpdateRequest = {
      matchId: currentMatch.matchId,
      userId: this.context.withUserInfo(userInfo => userInfo.userId)
    };

    return (
      <div className="match">
        <div className="match-menu">
          <div
            className="match-skip"
            onClick={() =>
              this.setMatchStatus({
                ...matchUpdateRequest,
                updateAction: "DECLINE"
              })
            }
          >
            <Checkmark />
          </div>
          <div
            className="match-like"
            onClick={() =>
              this.setMatchStatus({
                ...matchUpdateRequest,
                updateAction: "ACCEPT"
              })
            }
          />
        </div>
        <header className="match-header">
          <img
            src={`${API_GATEWAY}/img/${userInfo.avatar}`}
            width="100"
            height="100"
            alt="avatar"
            className="match-avatar"
          />
          <section className="match-main-info">
            <h3>
              {userInfo.name} {userInfo.surname}
            </h3>
            {adInfo.placeId.address}, {userInfo.age}
            <div className="attitude">
              <img
                src={pawIcon}
                alt="animals"
                width="20px"
                height="20px"
                className={`attitude-item ${adInfo.animals.toLowerCase()}`}
              />
              <img
                src={smokingIcon}
                alt="animals"
                width="20px"
                height="20px"
                className={`attitude-item ${adInfo.smoking.toLowerCase()}`}
              />
            </div>
          </section>
        </header>
        <section className="match-user-info">
          <span className="rent-pay">Готов платить: {adInfo.rentPay} т.р.</span>
          <span>О себе</span>
          <div>
            <p className="match-description">{userInfo.description}</p>
          </div>
          <div className="match-user-info-interests">
            {userInfo.interests.map(interest => (
              <SquareCheckbox
                name={interest}
                key={interest}
                checked
                size={70}
                readOnly
              >
                {interest}
              </SquareCheckbox>
            ))}
          </div>
        </section>
        <section className="match-room-type">
          <header>Готов подселиться в:</header>
          {adInfo.roomType.map(type => {
            const typeLowerCase = type.toLowerCase();
            return (
              <Checkbox name={type} key={type} readOnly checked>
                {roomTypeName.find(item => item[0] === typeLowerCase)[1]}
              </Checkbox>
            );
          })}
        </section>
        <section className="match-add-conveniences">
          <header>Дополнительные удобства:</header>
          {adInfo.conveniences.map(convenience => {
            const convenienceLowerCase = convenience.toLowerCase();
            return (
              <Checkbox name={convenience} key={convenience} readOnly checked>
                {
                  conveniencesName.find(
                    item => item[0] === convenienceLowerCase
                  )[1]
                }
              </Checkbox>
            );
          })}
        </section>
        <span>Дополнительная информация</span>
        <p className="match-description">{adInfo.description}</p>
      </div>
    );
  }
}
