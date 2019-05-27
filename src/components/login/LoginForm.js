import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import {
  registrationFormValidator,
  validateFormData,
  extractFormData,
  has
} from "../../utils/utils";
import "./LoginForm.scss";
import { ApplicationContext } from "../../context";

export default class LoginForm extends Component {
  static contextType = ApplicationContext;

  constructor(props) {
    super(props);
    this.state = {
      fieldErrors: {},
      inProgress: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const loginInfo = extractFormData(e.target);

    const errors = validateFormData(loginInfo, registrationFormValidator);
    if (has(errors)) {
      this.setState({
        fieldErrors: errors
      });
      return;
    }

    this.setState({
      inProgress: true
    });

    this.context.app.showSpinner();

    this.context.api
      .login(loginInfo, () => {
        this.setState({
          formError: "Невеная пара логин/пароль",
          inProgress: false
        });
      })
      .then(response => {
        if (!response) return;
        this.context.updateUserId(response.userId);
        if (response.isNewUser) {
          this.props.history.push("/profile");
          return;
        }
        this.setState({
          inProgress: false
        });
      });
  };

  render() {
    const { fieldErrors, formError, inProgress } = this.state;
    return (
      <div className="login-form-wrapper" onSubmit={this.handleSubmit}>
        <form className="login-form">
          <Input
            name="username"
            error={fieldErrors.username}
            value=""
            label="Email"
          />
          <Input
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
          <Button
            color="btn-yellow"
            className="login-form-submit"
            disabled={inProgress}
            progress={inProgress}
          >
            Вход
          </Button>
        </form>
      </div>
    );
  }
}
