import React, { Component } from "react";
import TextInput from "../common/Input";
import "./RegistrationForm.scss";
import Button from "../common/Button";
import { NavLink } from "react-router-dom";
import { ApplicationContext } from "../../context";
import { REGISTRATION_ENDPOINT, makePost } from "../../api.js";
import {
  extractFormData,
  validateFormData,
  registrationFormValidator,
  has
} from "../../utils/utils";

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
      registrationSuccess: false,
      registeredName: "",
      inProgress: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    var formData = extractFormData(e.target);

    const errors = validateFormData(formData, registrationFormValidator);

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
      .makePost(REGISTRATION_ENDPOINT, JSON.stringify(formData))
      .then(async response => {
        const responseJson = await response.json();
        if (response.status === 200) {
          this.setState({
            registrationSuccess: true,
            registeredName: formData.name
          });
          return;
        }
        if (response.status === 400) {
          for (const error of responseJson.errors) {
            if (!error.id) {
              this.setState({
                formError: (
                  <div>
                    Пользователь с указанным email уже существует, попробуйте{" "}
                    <NavLink to="/">войти</NavLink>
                  </div>
                )
              });
              return;
            }
          }
        }
      })
      .catch(() => console.log("error"))
      .finally(() => {
        this.setState({
          inProgress: false
        });
      });
  };

  render() {
    const {
      fieldValues,
      fieldErrors,
      registrationSuccess,
      registeredName,
      formError,
      inProgress
    } = this.state;
    return (
      <div className="registration-form-wrapper">
        {(registrationSuccess && (
          <div className="registration-form-success-msg">
            <div>
              {registeredName}, регистрация прошла успешно, мы выслали тебе на
              почту письмо с подтверждением.
            </div>
            <div>
              После подтверждения ты можешь <NavLink to="/">войти</NavLink> в
              систему.
            </div>
          </div>
        )) || (
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
        )}
      </div>
    );
  }
}
