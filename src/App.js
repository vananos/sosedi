import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import CreateAd from "./components/createad/CreateAd";
import RegistartionForm from "./components/registration/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import Spinner from "./components/common/Spinner";
import { ApplicationStateProvider, ApplicationContext } from "./context";
import ApiClient from "./api";
import "./App.css";
import Modal from "./components/common/Modal";
import ErrorHandler from "./ErrorHandler";
import Popup from "./components/common/Popup";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  unauthorizedDefaultHandler = () => {
    console.log("unathorized exception...");
  };

  forceAuthorization = () => {};

  initialAppState = {
    userId: null,
    authorizationRequired: false,

    app: {
      showSpinner: () => Modal.showModal(<Spinner />),
      hideSpinner: () => Modal.hideModal(),
      showPopup: (content, closeHandler) =>
        Modal.showModal(
          <Popup closeHandler={closeHandler}>{content}</Popup>,
          closeHandler
        ),
      hidePopup: () => Modal.hideModal(),

      forceAuthorization: this.forceAuthorization
    },
    api: new ApiClient({
      apiErrorHandler: response => {
        if (response.status === 401) {
          this.forceAuthorization();
        }
        throw "blia";
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

      this.app.forceAuthorization();
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
              <Route exact path="/registration" component={RegistartionForm} />
              <Route exact path="/create-ad" component={CreateAd} />
              <Route exact path="/messages" component={Main} />
              <Route exact path="/my-ads" component={Main} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Main} />
            </Switch>
          </section>
        </ErrorHandler>
      </ApplicationStateProvider>
    );
  }
}
