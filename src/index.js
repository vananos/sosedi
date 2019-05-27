import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Modal from "./components/common/Modal/Modal";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import NotificationManager from "./components/common/NotificationManager/NotificationManager";

ReactDOM.render(
  <Router>
    <Modal />
    <NotificationManager />
    <App />
  </Router>,
  document.getElementById("root")
);
