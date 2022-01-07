import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./loginAndRegister/Login";
import Register from "./loginAndRegister/Register";
import ProtectedRoute from "./ProtectedRoute";
import Chat from "./chat/Chat";
import Feedback from "./feedback/Feedback";
import axios from "../axios";
import { UserContext } from "./loginAndRegister/UserContext";

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    const localStorageData = localStorage.getItem("isAuth");
    return localStorageData ? JSON.parse(localStorageData) : false;
  });

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
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
        <ProtectedRoute exact path="/feedback" component={Feedback} />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
