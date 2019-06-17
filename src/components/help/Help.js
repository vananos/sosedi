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
    return (
      <div className="help-form">
        <span>Ответим на ваши вопросы в кратчайшие сроки.</span>
        <form onSubmit={this.handleSubmit}>
          <Input name="email" label="email" value="" error={emailError} />
          <Input name="name" label="Имя" value="" error={nameError} />
          Сообщение:
          <textarea name="question" />
          <Button disabled={inProgress} progress={inProgress}>
            Отправить
          </Button>
        </form>
      </div>
    );
  }
}
