import React, { Component } from "react";
import TextInput from "../common/TextInput";
import "./RegistrationForm.scss";
import Button from "../common/Button";
import { REGISTRATION_ENDPOINT, makePost } from "../../api.js";

export default class RegistrationForm extends Component {
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
      fieldErrors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var formDataObject = {};
    const { ctx } = this.props;

    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    const errors = {};

    for (const key in formDataObject) {
      if (registrationFormValidator[key]) {
        const fieldValidator = registrationFormValidator[key];
        const error = fieldValidator(formDataObject);
        if (error) {
          errors[key] = { error, value: formDataObject[key] };
        }
      }
    }
    if (Object.entries(errors).length) {
      this.setState({
        fieldErrors: errors
      });
      return;
    }
    makePost(REGISTRATION_ENDPOINT, JSON.stringify(formDataObject))
      .then(res => res.json())
      .then(ctx.hideSpinner)
      .catch(() => console.log("error"));

    ctx.showSpinner();
  };

  render() {
    const { fieldValues, fieldErrors } = this.state;
    return (
      <React.Fragment>
        <div className="registation-form-wrapper">
          <form  onSubmit={this.handleSubmit}>
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
            <Button color="btn-green" className="registation-form-submit-btn">
              Начать
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordError =
  "Пароль должен быть от 6 до 25 символов, включать в себя прописные, строчные буквы, цифры и спецсмиволы";

const registrationFormValidator = {
  name: formValues => {
    const name = formValues.name;
    if (!name || name.length < 2 || name.length > 15) {
      return "имя должно быть от 2 до 15 символов";
    }
  },
  surname: formValues => {
    const surname = formValues.surname;
    if (!surname || surname.length < 2 || surname.length > 15) {
      return "Фамилия должна быть от 2 до 15 символов";
    }
  },
  email: formValues => {
    const email = formValues.email;
    if (!emailRegex.test(email)) {
      return "Введите корректный email";
    }
  },
  password: formValues => {
    const password = formValues.password;
    if (!password || (password.length < 6 && password.length > 25)) {
      return passwordError;
    }
  },
  passwordConfirmation: formValues => {
    const passwordConfirmation = formValues.passwordConfirmation;
    if (passwordConfirmation !== formValues.password) {
      return "Потверждение пароля должно совпадать с паролем";
    }
  }
};
