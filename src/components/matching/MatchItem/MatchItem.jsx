import React, { Component } from "react";
import { API_GATEWAY } from "../../../api";
import "./MatchItem.scss";
import pawIcon from "../../../assets/ad/paw-solid.svg";
import smokingIcon from "../../../assets/ad/smoking-solid.svg";
import SquareCheckbox from "../../common/SquareCheckbox/SquareCheckbox";
import Checkbox from "../../common/SelectableInputs/Checkbox";
import { roomTypeName, conveniencesName } from "../../../utils/utils";
import emptyPhoto from "../../../assets/profile/user-regular.svg";
import Expandable from "../../common/Expandable/Expandable";
import PropTypes from "prop-types";

export default class MatchItem extends Component {
  render() {
    const {
      expandable,
      matchInfo: { userInfo, adInfo }
    } = this.props;

    const avatarUrl = userInfo.avatar
      ? `${API_GATEWAY}/img/${userInfo.avatar}`
      : emptyPhoto;

    const secondaryInfo = (
      <React.Fragment>
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
      </React.Fragment>
    );

    return (
      <div className="match">
        <header className="match-header">
          <img
            src={avatarUrl}
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
            {userInfo.phone && (
              <div className="match-phone">
                <a href={`tel:${userInfo.phone}`} >
                  {userInfo.phone}
                </a>
              </div>
            )}
          </section>
        </header>
        {expandable ? (
          <Expandable message="Подробнее">{secondaryInfo}</Expandable>
        ) : (
          <div>{secondaryInfo}</div>
        )}
      </div>
    );
  }
}

MatchItem.defaultProps = {
  expandable: false
};

MatchItem.propTypes = {
  expandable: PropTypes.bool
};
