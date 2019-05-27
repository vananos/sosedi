const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailValidator = formValues => {
  const email = formValues.email;
  if (!emailRegex.test(email)) {
    return "Введите корректный email";
  }
};

export const passwordError =
  "Пароль должен быть от 6 до 25 символов, включать в себя прописные, строчные буквы, цифры и спецсмиволы";

export const registrationFormValidator = {
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
  email: emailValidator,

  username: formValues => emailValidator({ email: formValues.username }),

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

export const validateFormData = (formDataObject, validator) => {
  if (formDataObject instanceof FormData) {
    formDataObject = extractFormData(formDataObject);
  }

  const errors = {};

  for (const key in formDataObject) {
    if (validator[key]) {
      const fieldValidator = validator[key];
      const error = fieldValidator(formDataObject);
      if (error) {
        errors[key] = { error, value: formDataObject[key] };
      }
    }
  }

  return errors;
};

export const extractFormData = formData => {
  const formDataObject = {};
  new FormData(formData).forEach((value, key) => {
    formDataObject[key] = value;
  });
  return formDataObject;
};

export const has = errors => !!Object.entries(errors).length;