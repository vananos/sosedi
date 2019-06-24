import React, { Component } from "react";
import "./PasswordResetPage.scss";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import NotificationManager from "../common/NotificationManager/NotificationManager";
import {
  extractFormData,
  validateFormData,
  Validators
} from "../../utils/utils";
import browserHistory from "../../browserHistory";
import { ApplicationContext } from "../../context";

export default class PasswordResetRequestPage extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    const secret = new URLSearchParams(window.location.search).get("sec");
    this.state = {
      inProgress: false,
      errors: {},
      secret
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const formData = extractFormData(e.target);
    const validationResult = validateFormData(formData, Validators);
    if (validationResult.hasErrors()) {
      this.setState({ errors: validationResult.errors });
      return;
    }

    if (this.state.secret) {
      this.handleReset(formData);
    } else {
      this.handleResetRequest(formData);
    }
  };

  handleResetRequest = formData => {
    this.setState({ inProgress: true });
    this.context.api
      .requestPasswordReset(formData.email)
      .ifSuccess(_ => {
        NotificationManager.notify(
          "На указанный вами адрес выслано письмо с информацией о восстановлении",
        );
      })
      .ifNotFound(() => {
        NotificationManager.notify(
          "Указанный email не зарегистрирован в системе",
          { type: "error" }
        );
        return false;
      })
      .execute()
      .finally(() => this.setState({ inProgress: false }));
  };

  handleReset = passwordResetRequest => {
    this.setState({ inProgress: true });
    this.context.api
      .resetPassword(passwordResetRequest)
      .ifSuccess(_ => {
        NotificationManager.notify(
          "Пароль успешно изменен, теперь вы можете войти в систему"
        );
        browserHistory.push("/");
      })
      .execute()
      .finally(() => this.setState({ inProgress: false }));
  };

  getResetRequestForm() {
    const { inProgress } = this.state;

    return (
      <React.Fragment>
        <span className="password-reset-hint">
          Для восстановаления пароля, пожалуйста, укажите ваш e-mail
        </span>
        <form onSubmit={this.handleSubmit}>
          <Input
            className="password-reset-input"
            value=""
            name="email"
            label="email"
            error={this.state.errors.email}
          />
          <Button
            className="submit"
            disabled={inProgress}
            progress={inProgress}
          >
            Сменить пароль
          </Button>
        </form>
      </React.Fragment>
    );
  }

  getResetForm(secret) {
    const { inProgress } = this.state;

    return (
      <React.Fragment>
        <span className="password-reset-hint">Введите новый пароль</span>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="secret" value={secret} />
          <Input
            className="password-reset-input"
            value=""
            type="password"
            name="password"
            label="Пароль"
            error={this.state.errors.password}
          />
          <Input
            className="password-reset-input"
            value=""
            type="password"
            name="passwordConfirmation"
            label="Подтверждение пароля"
            error={this.state.errors.passwordConfirmation}
          />
          <Button
            className="submit"
            disabled={inProgress}
            progress={inProgress}
          >
            Сменить пароль
          </Button>
        </form>
      </React.Fragment>
    );
  }

  render() {
    const { secret } = this.state;
    return (
      <div className="password-reset">
        {secret ? this.getResetForm(secret) : this.getResetRequestForm()}
      </div>
    );
  }
}
