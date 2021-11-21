import React from "react";
import "./Register.css";
import { useState, useContext, useEffect } from "react";
// import axios from "axios";
import axios from "../../axios.js";
import { UserContext } from "./UserContext";
import { Link, useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

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
    <div className="register_login">
      <div className="register_login__body">
        <form
          className="register_login__form"
          actions=""
          onSubmit={(e) => loginUser(e)}
        >
          <div className="register_login__formHeader">
            <Avatar style={{ background: "rgb(57, 169, 29)" }}>
              <LockIcon />
            </Avatar>
            <h2>Sign in</h2>
          </div>
          <div className="register_login__inputs">
            <TextField
              className="register_login__single"
              label="Login"
              variant="standard"
              placeholder="Enter your login"
              value={inputLogin}
              onChange={(e) => setInputLogin(e.target.value)}
              required
            />
            <TextField
              className="register_login__single"
              label="Password"
              variant="standard"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </div>

          <div className="register_login__buttonDiv">
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ background: "rgb(57, 169, 29)" }}
            >
              Log in
            </Button>
          </div>
          <p className="register_login__registerLink">
            Don't have an account?{" "}
            <span>
              <Link to="/register">Create one here!</Link>
            </span>
          </p>
          {loginError && <h1>LOGIN ERROR! WRONG LOGIN OR PASSWORD!</h1>}
        </form>
      </div>
    </div>
  );
}

export default Login;
