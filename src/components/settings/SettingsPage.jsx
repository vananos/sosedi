import React, { Component } from "react";
import "./SettingsPage.scss";
import SettingsItem from "./SettingsItem/SettingsItem";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { ApplicationContext } from "../../context";
import {
  extractFormData,
  validateFormData,
  Validators
} from "../../utils/utils";
import NotificationManager from "../common/NotificationManager/NotificationManager";
import Radio from "../common/SelectableInputs/Radio";
import Modal from "../common/Modal/Modal";
import browserHistory from "../../browserHistory";

export default class SettingsPage extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      expanded: [false, false, false],
      passwordChangeKey: 0,
      passwordChangeErrors: {},
      progress: false
    };
  }

  componentWillMount() {
    Modal.showSpinner();
    this.context.withUserInfo(userInfo =>
      this.context.api
        .getSettings(userInfo.userId)
        .ifSuccess(response =>
          this.setState({ currentFreq: response.data.freq })
        )
        .execute()
        .finally(() => Modal.hide())
    );
  }

  handleClick = index => {
    if (this.state.progress) {
      return;
    }
    this.setState({
      expanded: this.state.expanded.map((_, i) => index === i)
    });
  };

  handlePasswordChange = e => {
    e.preventDefault();

    const formData = extractFormData(e.target);

    const validationResult = validateFormData(formData, Validators);
    if (validationResult.hasErrors()) {
      this.setState({
        passwordChangeErrors: validationResult.errors
      });
    }

    this.setState({ propgress: true });

    this.context.withUserInfo(userInfo => {
      formData.userId = userInfo.userId;

      this.context.api
        .changePassword(formData)
        .ifSuccess(() => {
          NotificationManager.notify("Пароль был успешно изменен");
          this.setState({
            passwordChangeKey: this.state.passwordChangeKey + 1
          });
        })
        .execute()
        .finally(() => this.setState({ propgress: false }));
    });
  };

  handleNotificationSettingsChange = e => {
    this.context.withUserInfo(userInfo => {
      this.context.api
        .updateNotificationSettings({
          userId: userInfo.userId,
          freq: e.target.value
        })
        .ifSuccess(_ =>
          NotificationManager.notify("Настройки уведомлений успешно изменены")
        )
        .execute();
    });
  };

  deleteAccount = () => {
    this.context.withUserInfo(userInfo =>
      this.context.api
        .deleteAccount(userInfo.userId)
        .ifSuccess(_ => {
          NotificationManager.notify("Ваш аккаунт успешно удален");
          browserHistory.push("/");
        })
        .execute()
    );
  };

  render() {
    const {
      expanded,
      passwordChangeErrors,
      passwordChangeKey,
      progress,
      currentFreq
    } = this.state;

    if (!currentFreq) {
      return null;
    }

    return (
      <div className="settings-page">
        <SettingsItem
          description="Изменить пароль"
          expanded={expanded[0]}
          onClick={_ => this.handleClick(0)}
        >
          <form onSubmit={this.handlePasswordChange} key={passwordChangeKey}>
            <Input
              type="password"
              name="password"
              label="Пароль"
              error={passwordChangeErrors.password}
            />
            <Input
              type="password"
              name="passwordConfirmation"
              label="Подтверждение пароля"
              error={passwordChangeErrors.passwordConfirmation}
            />
            <Button
              className="settings-page-submit-button"
              progress={progress}
              disabled={progress}
            >
              Изменить пароль
            </Button>
          </form>
        </SettingsItem>
        <SettingsItem
          description="Уведомления"
          expanded={expanded[1]}
          onClick={_ => this.handleClick(1)}
        >
          <form onChange={this.handleNotificationSettingsChange}>
            <span className="hint">Присылать уведомления не чаще чем:</span>
            {[
              ["NEVER", "Никогда"],
              ["ONE_HOUR", "Раз в час"],
              ["ONE_DAY", "Раз в день"]
            ].map(radioInfo => (
              <Radio
                name="freq"
                value={radioInfo[0]}
                key={radioInfo[0]}
                checked={radioInfo[0] === currentFreq}
                className="notification-freq"
              >
                {radioInfo[1]}
              </Radio>
            ))}
          </form>
        </SettingsItem>
        <SettingsItem
          description="Удалить аккаунт"
          withoutBorder
          expanded={expanded[2]}
          onClick={_ => this.handleClick(2)}
        >
          <Button
            color="red"
            onClick={this.deleteAccount}
            progress={progress}
            disabled={progress}
          >
            Удалить аккаунт
          </Button>
        </SettingsItem>
      </div>
    );
  }
}
