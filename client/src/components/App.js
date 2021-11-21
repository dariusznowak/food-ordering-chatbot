import "./App.css";
// import Sidebar from "./sidebar/Sidebar";
// import Chat from "./chat/Chat";
// import UserSettings from "./userSettings/UserSettings";
// import Feedback from "./feedback/Feedback";
/*react router*/
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./loginAndRegister/Login";
import Register from "./loginAndRegister/Register";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./chat/Chat";
import Feedback from "./feedback/Feedback";
import UserSettings from "./userSettings/UserSettings";
import axios from "../axios";

import { UserContext } from "./loginAndRegister/UserContext";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    const localStorageData = localStorage.getItem("isAuth");
    return localStorageData ? JSON.parse(localStorageData) : false;
  });

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    //mamy nasz token, a dane pobieramy z ciasteczka
    axios
      .get("/user", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        // setIsAuth(true);
      })
      .catch(() => {
        axios.post("/logout", {}, { withCredentials: true }).then(() => {
          setUserInfo({});
        });
      });
  }, [isAuth]);

  return (
    <UserContext.Provider value={{ isAuth, setIsAuth, userInfo, setUserInfo }}>
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <ProtectedRoute exact path="/" component={Chat} />
        <ProtectedRoute
          exact
          path="/usersettings"
          component={UserSettings}
          // isAuth={isAuth}
        />
        <ProtectedRoute
          exact
          path="/feedback"
          component={Feedback}
          // isAuth={isAuth}
        />
        {/* path to ta czesc '...rest', a component to nasz strzezony component */}
        {/* to ZMIENIC!!!!!! isAuth to powinna byc jakas zmienna globalna z zalogowania czy cos (jakis useContext czy cos) */}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
