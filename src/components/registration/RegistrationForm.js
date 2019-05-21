import React, { Component } from "react";
import TextInput from "../common/TextInput";
import "./RegistrationForm.scss";
import Button from "../common/Button";
import { REGISTRATION_ENDPOINT, makePost } from "../../api.js";
import { ApplicationContextConsumer } from "../../context";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var object = {};
    const { ctx } = this.props;

    formData.forEach((value, key) => {
      object[key] = value;
    });
    makePost(REGISTRATION_ENDPOINT, object)
      .then(res => res.json())
      .then(ctx.hideSpinner)
      .catch(() => console.log("error"));

    ctx.showSpinner();
  };

  render() {
    return (
      <React.Fragment>
        <div className="registation-form-wrapper">
          <form action="" onSubmit={this.handleSubmit}>
            <TextInput label="Имя" name="name" value="" />
            <TextInput label="Фамилия" name="surname" value="" />
            <TextInput label="E-MAIL" name="email" type="email" value="" />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
              value=""
            />
            <TextInput
              label="Потверждение пароля"
              name="passwordConfirmation"
              type="password"
              value=""
            />
            <Button color="btn-green" className="registation-form-submit-btn">
              Начать
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
