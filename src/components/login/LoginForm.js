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

  handleSubmit = async e => {
    e.preventDefault();
    const formData = formDataToObject(e.target);

    const errors = validateForm(formData, registrationFormValidator);

    if (Object.entries(errors).length) {
      this.setState({
        fieldErrors: errors
      });
      return;
    }

    this.setState({
      inProgress: true
    });

    await makePost(
      LOGIN_ENDPOINT,
      `username=${formData.username}&password=${formData.password}`,
      new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
      () => {
        this.setState({
          formError: "Невеная пара логин/пароль",
          inProgress: false
        });
      }
    ).then(response => {
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
