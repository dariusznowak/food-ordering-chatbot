import React from "react";
import "./Register.css";
import { useState, useContext, useEffect } from "react";
// import axios from "axios";
import axios from "../../axios.js";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

// function Register() {
function Register() {
  // const [email, setEmail] = useState("");
  // const [fullName, setFullName] = useState("");
  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [registerError, setRegisterError] = useState(false);

  const { isAuth, setIsAuth, login, setLogin, userInfo, setUserInfo } =
    useContext(UserContext);

  //funkcja, ktora przechodzi do ekranu glownego po pomyslnym zalogowaniu
  const history = useHistory();
  const goToMainPage = () => {
    history.push("/");
  };

  const registerUser = (e) => {
    e.preventDefault();
    // const data = { login, email, password, fullName };
    const data = { login: inputLogin, password: inputPassword };
    // console.log(data);

    // //axios robi ajax requesta
    axios
      .post("/register", data, { withCredentials: true })
      .then((res) => {
        //tutaj linikja ustawiajaca login w context
        // setLogin(res.data.login);
        setUserInfo(res.data);
        setInputLogin("");
        setInputPassword("");
        // setIsAuth(true);
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
    <form className="register" actions="" onSubmit={(e) => registerUser(e)}>
      <h2>Register Page</h2>
      {/* <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="fullName"
        placeholder="full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      /> */}
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

      <button type="submit">register</button>
      {registerError && (
        <h1>REGISTER ERROR! USER WITH SUCH LOGIN EXISTS IN DB!</h1>
      )}
    </form>
  );
}

export default Register;
