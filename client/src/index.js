import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/loginAndRegister/Login";
import Register from "./components/loginAndRegister/Register";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
