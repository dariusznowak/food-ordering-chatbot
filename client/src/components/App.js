import "./App.css";
// import Sidebar from "./sidebar/Sidebar";
// import Chat from "./chat/Chat";
// import UserSettings from "./userSettings/UserSettings";
// import Feedback from "./feedback/Feedback";
/*react router*/
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./loginAndRegister/Login";
import Register from "./loginAndRegister/Register";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./chat/Chat";
import Feedback from "./feedback/Feedback";
import UserSettings from "./userSettings/UserSettings";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  // const isAuth = false;

  return (
    <Router>
      {/* <ProtectedRoute /> */}

      {/* <Route exact path="/login">
        <Login />
      </Route> */}

      <Route exact path="/register">
        <Register />
      </Route>
      {/* <ProtectedApp /> */}
      {/* <ProtectedRoute exact path="/" component={ProtectedApp} isAuth={isAuth} /> */}
      <ProtectedRoute exact path="/" component={Chat} isAuth={isAuth} />
      <ProtectedRoute
        exact
        path="/usersettings"
        component={UserSettings}
        isAuth={isAuth}
      />
      <ProtectedRoute
        exact
        path="/feedback"
        component={Feedback}
        isAuth={isAuth}
      />
      {/* path to ta czesc '...rest', a component to nasz strzezony component */}
      {/* to ZMIENIC!!!!!! isAuth to powinna byc jakas zmienna globalna z zalogowania czy cos (jakis useContext czy cos) */}
      {/* trzeba tez wykminic jak zabezpieczyc pozostale route'y, m.in: "/feedback", "/usersettings" , bo powyzsza opcja sprawia
        ze zostaje wyrenderowany tylko jeden komponent*/}
    </Router>
  );
}

export default App;
