import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Chat from "./chat/Chat";
import UserSettings from "./userSettings/UserSettings";
import Feedback from "./feedback/Feedback";
/*react router*/
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./login/LoginPage";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
