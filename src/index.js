import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Modal from "./components/common/Modal";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <Router>
    <Modal />
    <App />
  </Router>,
  document.getElementById("root")
);
