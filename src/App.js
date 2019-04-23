import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Profile from "./components/profile/Profile";
import Navbar from "./components/navbar/Navbar";
import CreateAd from "./components/createad/CreateAd";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="main-header">
          <Navbar />
        </header>
        <section className="main-content">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/create-ad" component={CreateAd} />
            <Route exact path="/messages" component={Main} />
            <Route exact path="/my-ads" component={Main} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/settings" component={Main} />
          </Switch>
        </section>
      </React.Fragment>
    );
  }
}
