import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { makePost, LOGIN_ENDPOINT } from "../../api";
import "./LoginForm.scss";

export default class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    makePost(LOGIN_ENDPOINT, formData).then(() =>
      this.props.ctx.hideSpinner()
    );

    this.props.ctx.showSpinner();
  };

  render() {
    return (
      <div className="login-form-wrapper" onSubmit={this.handleSubmit}>
        <form className="login-form">
          <TextInput name="email" value="" label="Email" />
          <TextInput type="password" value="" name="password" label="Пароль" />
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
