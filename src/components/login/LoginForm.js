import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { makePost, LOGIN_ENDPOINT } from "../../api";
import {
  registrationFormValidator,
  validateForm,
  formDataToObject
} from "../../utils/utils";
import "./LoginForm.scss";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldErrors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = formDataToObject(new FormData(e.target));
    const ctx = this.props.ctx;

    const errors = validateForm(formData, registrationFormValidator);

    if (Object.entries(errors).length) {
      this.setState({
        fieldErrors: errors
      });
      return;
    }

    ctx.showSpinner();

    class WrongCredentials {}

    makePost(
      LOGIN_ENDPOINT,
      `username=${formData.username}&password=${formData.password}`,
      new Headers({ "Content-Type": "application/x-www-form-urlencoded" })
    )
      .then(respnose => {
        if (respnose.status === 401) {
          throw new WrongCredentials();
        }
      })
      .catch(e => {
        if (e instanceof WrongCredentials) {
          this.setState({
            formError: "Невеная пара логин/пароль"
          });
        }
      })
      .finally(ctx.hideSpinner);
  };

  render() {
    const { fieldErrors, formError } = this.state;
    return (
      <div className="login-form-wrapper" onSubmit={this.handleSubmit}>
        <form className="login-form">
          <TextInput
            name="username"
            error={fieldErrors.username}
            value=""
            label="Email"
          />
          <TextInput
            type="password"
            value=""
            name="password"
            error={fieldErrors.password}
            label="Пароль"
          />
          {formError && <div className="error">{formError}</div>}
          <div className="login-form-links">
            <NavLink to="/passwordrestore" className="login-form-link">
              Забыл пароль?
            </NavLink>
            <NavLink to="/registration" className="login-form-link">
              Еще не зарегестрирован?
            </NavLink>
          </div>
          <Button color="btn-yellow" className="login-form-submit">
            Вход
          </Button>
        </form>
      </div>
    );
  }
}
