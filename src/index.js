import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Modal from "./components/common/Modal/Modal";
import { Router } from "react-router-dom";
import browserHistory from "./browserHistory";
import App from "./App";
import NotificationManager from "./components/common/NotificationManager/NotificationManager";
import { switchBackgroundAccordingPath } from "./utils/utils";

ReactDOM.render(
  <Router history={browserHistory}>
    <Modal />
    <NotificationManager />
    <App />
  </Router>,
  document.getElementById("root")
);
switchBackgroundAccordingPath(document.location.pathname);
