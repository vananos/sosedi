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
import "./App.css";
import Modal from "./components/common/Modal";

export default class App extends Component {
  render() {
    return (
      <ApplicationStateProvider>
        <React.Fragment>
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
          <ApplicationContext.Consumer>
            {value => (
              <Modal display={value.shouldShowSpinner}>
                <Spinner />
              </Modal>
            )}
          </ApplicationContext.Consumer>
        </React.Fragment>
      </ApplicationStateProvider>
    );
  }
}
