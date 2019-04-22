import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Navbar from "./components/navbar/Navbar";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/create-ad" component={Main} />
          <Route exact path="/messages" component={Main} />
          <Route exact path="/my-ads" component={Main} />
          <Route exact path="/profile" component={Main} />
          <Route exact path="/settings" component={Main} />
        </Switch>
      </React.Fragment>
    );
  }
}