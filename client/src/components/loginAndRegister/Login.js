import React from "react";
import "./Register.css";
import { useState, useContext, useEffect } from "react";
// import axios from "axios";
import axios from "../../axios.js";
import { UserContext } from "./UserContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const { isAuth, setIsAuth, login, setLogin, userInfo, setUserInfo } =
    useContext(UserContext);

  //funkcja, ktora przechodzi do ekranu glownego po pomyslnym zalogowaniu
  const history = useHistory();
  const goToMainPage = () => {
    history.push("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    const data = { login: inputLogin, password: inputPassword };

    axios
      .post("/login", data, { withCredentials: true })
      .then((res) => {
        // setLogin(res.data.login);
        setUserInfo(res.data);

        setInputLogin("");
        setInputPassword("");
        setIsAuth(true);
        setLoginError(false);
        localStorage.setItem("isAuth", JSON.stringify(true));
        goToMainPage();
      })
      .catch(() => {
        setLoginError(true);
        setIsAuth(false);
        localStorage.setItem("isAuth", JSON.stringify(false));
      });
  };

  return (
    <form className="register" actions="" onSubmit={(e) => loginUser(e)}>
      <h2>Login Page</h2>

      <input
        type="login"
        placeholder="login"
        value={inputLogin}
        onChange={(e) => setInputLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />

      <button type="submit">log in</button>
      <h1>
        Don't have an account?
        <span>
          <Link to="/register">register here</Link>
        </span>
      </h1>

      {loginError && <h1>LOGIN ERROR! WRONG LOGIN OR PASSWORD!</h1>}
    </form>
  );
}

export default Login;
