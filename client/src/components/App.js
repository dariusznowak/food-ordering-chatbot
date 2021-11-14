import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";
import UserSettings from "./userSettings/UserSettings";
import Feedback from "./feedback/Feedback";
/*react router*/
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./loginAndRegister/Login";
import Register from "./loginAndRegister/Register";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app">
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Chat />
                </Route>
                <Route path="/usersettings">
                  <UserSettings />
                </Route>
                <Route path="/feedback">
                  <Feedback />
                </Route>
              </Switch>
            </div>
          </div>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
