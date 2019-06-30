import React, { Component } from "react";
import { ApplicationContext } from "../../../context";
import Modal from "../../common/Modal/Modal";
import "./FindMatchingPage.scss";
import Checkmark from "../../common/Checkmark/Checkmark";
import MatchItem from "../MatchItem/MatchItem";

export default class FindMatchingPage extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      renderChange: false
    };
    this.matches = [];
  }

  componentDidMount() {
    Modal.showSpinner();
    this.loadMatchesFromServer().finally(() => {
      Modal.hide();
      this.setState({ loaded: true });
    });
  }

  getNextMatch = () => {
    if (this.matches.length <= 1) {
      this.loadMatchesFromServer();
    }
    return this.matches.shift();
  };

  loadMatchesFromServer = () => {
    return this.context.withUserInfo(userInfo => {
      return this.context.api
        .getMatches(userInfo.userId)
        .ifSuccess(res => {
          this.matches = [...this.matches, ...res.data];
        })
        .execute();
    });
  };

  setMatchStatus = (matchUpdateRequest, currentMatch) => {
    this.context.api
      .updateMatch(matchUpdateRequest)
      .ifSuccess(() =>
        this.setState({
          renderChange: matchUpdateRequest.updateAction,
          currentMatch
        })
      )
      .execute();
  };

  render() {
    if (!this.state.loaded) {
      return null;
    }

    let currentMatch;
    const { renderChange } = this.state;

    if (renderChange) {
      currentMatch = this.state.currentMatch;
      //rerender after animation
      setTimeout(
        () => this.setState({ renderChange: null, currentMatch: null }),
        1000
      );
    } else {
      currentMatch = this.getNextMatch();
    }

    if (!currentMatch) {
      return <div style={{ textAlign: "center" }}>Пока совпадений нет</div>;
    }

    const matchUpdateRequest = {
      matchId: currentMatch.matchId,
      userId: this.context.withUserInfo(userInfo => userInfo.userId)
    };

    return (
      <div>
        <div className="match-menu">
          <div
            className="match-menu-like"
            onClick={() =>
              this.setMatchStatus(
                {
                  ...matchUpdateRequest,
                  updateAction: "ACCEPT"
                },
                currentMatch
              )
            }
          />
          <div
            className="match-menu-skip"
            onClick={() =>
              this.setMatchStatus(
                {
                  ...matchUpdateRequest,
                  updateAction: "DECLINE"
                },
                currentMatch
              )
            }
          >
            <Checkmark />
          </div>
        </div>
        <div
          className={`match-item-wrapper ${(renderChange &&
            (renderChange === "ACCEPT"
              ? "match-like-animate"
              : "match-next-animate")) ||
            "match-appereance-animate"}
          `}
        >
          <MatchItem matchInfo={currentMatch} />
        </div>
      </div>
    );
  }
}
