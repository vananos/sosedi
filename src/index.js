import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ApplicationContextProvider } from "./context";

ReactDOM.render(
  <ApplicationContextProvider>
    <Router>
      <App />
    </Router>
  </ApplicationContextProvider>,
  document.getElementById("root")
);
