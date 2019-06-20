import React, { Component } from "react";
import { ApplicationContext } from "../../context";
import Modal from "../common/Modal/Modal";
import { API_GATEWAY } from "../../api";
import "./MatchingPage.scss";
import Checkmark from "../common/Checkmark/Checkmark";
import SquareCheckbox from "../common/SquareCheckbox/SquareCheckbox";

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
    console.log(this.matches);
    if (this.matches.length <= 1) {
      this.loadMatchesFromServer();
    }
    return this.matches.shift();
  };

  loadMatchesFromServer = () => {
    return this.context.api
      .getMatches(this.context.getUserInfo().userId)
      .ifSuccess(res => {
        this.matches = [...this.matches, ...res.data];
      })
      .execute();
  };

  render() {
    if (!this.state.loaded) {
      return null;
    }
    const currentMatch = this.getNextMatch();
    if (!currentMatch) {
      return null;
      //there is no more matces now
    }

    const { userInfo, adInfo } = currentMatch;
    console.log(userInfo, adInfo);

    return (
      <div className="match">
        <div className="match-menu">
          <div className="match-skip">
            <Checkmark />
          </div>
          <div className="match-like" />
        </div>
        <header>
          <img
            src={`${API_GATEWAY}/img/${userInfo.avatar}`}
            width="100"
            height="100"
            alt="avatar"
            className="match-avatar"
          />
          <div className="match-main-info">
            <h3>
              {userInfo.name} {userInfo.surname}
            </h3>
            {adInfo.placeId.address}, {userInfo.age}
          </div>
        </header>
        <section className="match-user-info">
          <span>О себе</span>
          <div>
            <p className="match-user-info-aboutitself">
              {userInfo.description}
            </p>
          </div>
          <div className="match-user-info-interests">
            {userInfo.interests.map(interest => (
              <SquareCheckbox checked size={70} readOnly>
                {interest}
              </SquareCheckbox>
            ))}
          </div>
        </section>
      </div>
    );
  }
}
