import React, { Component } from "react";
import { ApplicationContext } from "../../../context";
import Modal from "../../common/Modal/Modal";
import MatchItem from "../MatchItem/MatchItem";
import { NavLink } from "react-router-dom";
import "./MutualMatch.scss";

export default class MutualMatch extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      waitServer: true
    };
  }

  componentWillMount() {
    Modal.showSpinner();
    this.context.withUserInfo(userInfo => {
      this.context.api
        .getMutualMatches(userInfo.userId)
        .ifSuccess(response =>
          this.setState({
            matches: response.data
          })
        )
        .execute()
        .finally(() => {
          this.setState({ waitServer: false });
          Modal.hide();
        });
    });
  }

  render() {
    if (this.state.waitServer) {
      return null;
    }
    return (
      <div className="mutual-matches">
        {this.state.matches.length ? (
          this.state.matches.map(match => (
            <div className="match-wrapper">
              <MatchItem matchInfo={match} expandable />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            Пока нет взаимного интереса с другими людьми. Перейти к{" "}
            <NavLink to="/matching">поиску соседа</NavLink>
          </div>
        )}
      </div>
    );
  }
}
