import React from "react";
import "./Register.css";
import { useState, useContext } from "react";
// import axios from "axios";
// import axios from "../../axios.js";
// import UserContext from "./UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault();

    // const data = { login, email, password, fullName };

    // //axios robi ajax requesta
    // axios.post("/register", data).then((res) => {
    //   console.log(res.data.email);
    //   // user.setEmail(res.data.email);
    // });
  };

  return (
    <form className="register" actions="" onSubmit={(e) => registerUser(e)}>
      <h2>Register Page</h2>
      <input
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
      />
      <input
        type="login"
        placeholder="login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">register</button>
    </form>
  );
}

export default Register;
