import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <h1> Welcome to login page!</h1>
      <Link to="/register" className="sidebar__link">
        <div>
          <p> Don't have accout? Register here</p>
        </div>
      </Link>
    </div>
  );
}

export default Login;
