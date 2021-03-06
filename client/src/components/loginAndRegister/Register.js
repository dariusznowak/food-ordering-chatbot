import React from "react";
import "./Register.css";
import { useState, useContext } from "react";
import axios from "../../axios.js";
import { UserContext } from "./UserContext";
import { Link, useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

function Register() {
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputFullName, setInputFullName] = useState("");
  const [inputResidence, setInputResidence] = useState("");
  const [registerError, setRegisterError] = useState(false);

  const { isAuth, setUserInfo } = useContext(UserContext);

  const history = useHistory();
  const goToMainPage = () => {
    history.push("/");
  };

  const registerUser = (e) => {
    e.preventDefault();
    const data = {
      fullName: inputFullName,
      login: inputLogin,
      residence: inputResidence,
      password: inputPassword,
    };

    axios
      .post("/register", data, { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
        setInputLogin("");
        setInputPassword("");
        setInputFullName("");
        setInputResidence("");
        localStorage.setItem("isAuth", JSON.stringify(true));
        console.log("powinno byc true: " + isAuth);
        setRegisterError(false);
        goToMainPage();
      })
      .catch(() => {
        setRegisterError(true);
        localStorage.setItem("isAuth", JSON.stringify(false));
      });
  };

  return (
    <div className="register_login">
      <div className="register_login__body">
        <form
          className="register_login__form"
          actions=""
          onSubmit={(e) => registerUser(e)}
        >
          <div className="register_login__formHeader">
            <Avatar style={{ background: "rgb(57, 169, 29)" }}>
              <LockIcon />
            </Avatar>
            <h2>Create a new account</h2>
          </div>

          <div className="register_login__inputs">
            <TextField
              inputProps={{
                maxLength: "30",
              }}
              className="register_login__single"
              label="Full name"
              variant="standard"
              placeholder="Enter your full name"
              required
              value={inputFullName}
              onChange={(e) => setInputFullName(e.target.value)}
            />
            <TextField
              inputProps={{
                maxLength: "60",
              }}
              className="register_login__single"
              label="Login"
              variant="standard"
              placeholder="Enter your login"
              required
              value={inputLogin}
              onChange={(e) => setInputLogin(e.target.value)}
            />
            <TextField
              inputProps={{
                maxLength: "60",
              }}
              className="register_login__single"
              label="Address of residence"
              variant="standard"
              placeholder="Enter your address of residence"
              required
              value={inputResidence}
              onChange={(e) => setInputResidence(e.target.value)}
            />

            <TextField
              inputProps={{
                maxLength: "20",
              }}
              className="register_login__single"
              label="Password"
              variant="standard"
              placeholder="Enter your password"
              type="password"
              required
              autoComplete="current-password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>

          <div className="register_login__buttonDiv">
            <Button
              style={{ background: "rgb(57, 169, 29)" }}
              type="submit"
              variant="contained"
              color="success"
            >
              Register
            </Button>
          </div>

          <p className="register_login__registerLink">
            Already have an account?{" "}
            <span>
              <Link to="/login">Sign in</Link>
            </span>
          </p>

          {registerError && (
            <p style={{ color: "red" }}>
              REGISTER ERROR! USER WITH SUCH LOGIN EXISTS IN DB!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
