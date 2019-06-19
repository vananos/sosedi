import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Navbar from "./components/navbar/Navbar/Navbar";
import CreateAd from "./components/createad/CreateAd/CreateAd";
import RegistartionForm from "./components/registration/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import { ApplicationStateProvider, ApplicationContext } from "./context";
import ApiClient from "./api";
import NotificationManager from "./components/common/NotificationManager/NotificationManager";
import browserHistory from "./browserHistory";
import "./App.scss";
import ErrorHandler from "./ErrorHandler";
import ErrorPage from "./components/error/ErrorPage";
import Help from "./components/help/Help";
import EmailConfirmationPage from "./components/emailconfirmation/EmailConfirmationPage";
import MatchingPage from "./components/matching/MatchingPage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  forceAuthorization = () => {
    browserHistory.push("/");
    NotificationManager.notify(
      <span>Для работы с приложением, пожалуйста, пройдите авторизацию</span>,
      { type: "error" }
    );
  };

  initialAppState = {
    userId: null,
    authorizationRequired: false,
    api: new ApiClient({
      apiErrorHandler: response => {
        if (response.status === 401) {
          this.forceAuthorization();
          return;
        }
        browserHistory.push("/error");
      }
    }),

    updateUserId: userId => {
      this.userId = userId;
      if (localStorage) {
        localStorage.setItem("userId", userId);
      }
    },

    getUserId: () => {
      if (this.userId) {
        return this.userId;
      }
      if (localStorage && localStorage.getItem("userId")) {
        return localStorage.getItem("userId");
      }

      this.forceAuthorization();
    }
  };

  render() {
    return (
      <ApplicationStateProvider value={this.initialAppState}>
        <ErrorHandler>
          <header className="main-header">
            <Navbar />
          </header>
          <section className="main-content">
            <Switch>
              <Route exact path="/" component={LoginForm} />
              <Route
                exact
                path="/confirmhandler"
                component={EmailConfirmationPage}
              />
              <Route exact path="/registration" component={RegistartionForm} />
              <Route exact path="/create-ad" component={CreateAd} />
              <Route exact path="/messages" component={Main} />
              <Route exact path="/my-ads" component={Main} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Main} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/matching" component={MatchingPage} />
              <Route exact path="/error" component={ErrorPage} />
            </Switch>
          </section>
        </ErrorHandler>
      </ApplicationStateProvider>
    );
  }
}
