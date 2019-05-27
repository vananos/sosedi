import React, { Component } from "react";
import TextInput from "../common/Input/Input";
import "./RegistrationForm.scss";
import Button from "../common/Button/Button";
import { NavLink } from "react-router-dom";
import { ApplicationContext } from "../../context";
import {
  extractFormData,
  validateFormData,
  registrationFormValidator,
  has
} from "../../utils/utils";
import Modal from "../common/Modal/Modal";
import Popup from "../common/Popup/Popup";
import NotificationManager from "../common/NotificationManager/NotificationManager";

export default class RegistrationForm extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      fieldValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      fieldErrors: {},
      registeredName: "",
      inProgress: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    var registrationData = extractFormData(e.target);

    const errors = validateFormData(
      registrationData,
      registrationFormValidator
    );

    if (has(errors)) {
      this.setState({
        fieldErrors: errors
      });
      return;
    }

    this.setState({
      inProgress: true
    });

    this.context.api
      .registration(registrationData)
      .ifBadRequest(jsonResponse => {
        if (jsonResponse.errors.some(error => !error.id)) {
          this.setState({
            formError: (
              <div>
                Пользователь с указанным email уже существует, попробуйте
                <NavLink to="/">войти</NavLink>
              </div>
            )
          });
          return false;
        }
      })
      .ifSuccess(jsonResponse => {
        NotificationManager.notify(
          <div>
            <div>
              {registrationData.name}, регистрация прошла успешно, мы выслали
              тебе на почту письмо с подтверждением.
            </div>
            <div>После подтверждения ты можешь войти в систему.</div>
          </div>,
          { duration: 5000 }
        );
        this.props.history.push("/");
      })
      .execute()
      .finally(() => {
        this.setState({
          inProgress: false
        });
      });
  };

  render() {
    const { fieldValues, fieldErrors, formError, inProgress } = this.state;
    return (
      <div className="registration-form-wrapper">
        <form onSubmit={this.handleSubmit}>
          <TextInput
            label="Имя"
            name="name"
            value={fieldValues.name}
            error={fieldErrors.name}
          />
          <TextInput
            label="Фамилия"
            name="surname"
            value={fieldValues.surname}
            error={fieldErrors.surname}
          />
          <TextInput
            label="Email"
            name="email"
            type="text"
            value={fieldValues.email}
            error={fieldErrors.email}
          />
          <TextInput
            label="Пароль"
            name="password"
            type="password"
            value={fieldValues.password}
            error={fieldErrors.password}
          />
          <TextInput
            label="Потверждение пароля"
            name="passwordConfirmation"
            type="password"
            value={fieldValues.passwordConfirmation}
            error={fieldErrors.passwordConfirmation}
          />
          {formError && <div className="error">{formError}</div>}
          <Button
            color="btn-green"
            className="registration-form-submit-btn"
            disabled={inProgress}
            progress={inProgress}
          >
            Начать
          </Button>
        </form>
      </div>
    );
  }
}
