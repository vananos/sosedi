import React, { Component } from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import "./Help.scss";
import {
  extractFormData,
  validateFormData,
  Validators
} from "../../utils/utils";
import { ApplicationContext } from "../../context";
import NotificationManager from "../common/NotificationManager/NotificationManager";
import browserHistory from "../../browserHistory";

export default class Help extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      inProgress: false
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

    if(!formData.email) {
      formData.name = this.context.getUserInfoUnsafe().userName;
      formData.email = this.context.getUserInfoUnsafe().email;
    }

    this.setState({ inProgress: true });
    this.context.api
      .sendFeedback(formData)
      .ifSuccess(() => {
        NotificationManager.notify(
          "Ваше обращение успешно отправлено, мы свяжемся с вами в ближайшее время"
        );
        browserHistory.push("/");
      })
      .execute()
      .finally(() => this.setState({ inProgress: false }));
  };

  render() {
    const { email: emailError, name: nameError, questionError } =
      this.state.errors || {};
    const { inProgress } = this.state;

    const userInfo = this.context.getUserInfoUnsafe();

    return (
      <div className="help-form">
        <span>
          {userInfo ? `${userInfo.userName}, ответим` : "Ответим"} на ваши
          вопросы в кратчайшие сроки.
        </span>
        <form onSubmit={this.handleSubmit}>
          {!userInfo && (
            <React.Fragment>
              <Input
                className="help-form-input"
                name="email"
                label="email"
                value=""
                error={emailError}
              />
              <Input
                className="help-form-input"
                name="name"
                label="Имя"
                value=""
                error={nameError}
              />
            </React.Fragment>
          )}
          <label>Сообщение:</label>
          <textarea name="question" />
          <Button
            className="submit"
            disabled={inProgress}
            progress={inProgress}
          >
            Отправить
          </Button>
        </form>
      </div>
    );
  }
}
