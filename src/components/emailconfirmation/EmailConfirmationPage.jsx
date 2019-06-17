import React, { Component } from "react";
import browserHistory from "../../browserHistory";
import NotificationManager from "../common/NotificationManager/NotificationManager";

export default class EmailConfirmationPage extends Component {
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const confirmationStatus = params.get("status");
    if (confirmationStatus === null) {
      browserHistory.push("/error");
    }

    switch (confirmationStatus) {
      case "confirmed":
        NotificationManager.notify(
          `${params.get(
            "username"
          )}, ваш email успешно подтвержден, теперь вы можете войти`
        );
        break;
      case "error":
        NotificationManager.notify(
          `Ошибка во время подтверждения email, пожалуйста, свяжитесь со службой поддержки`,
          { type: "error" }
        );
        break;
      case "cancelled":
        NotificationManager.notify(
          "Регистрация вашей учетной записи была успешно отменена"
        );
        break;
    }

    browserHistory.push("/");
  }

  render() {
    return null;
  }
}
