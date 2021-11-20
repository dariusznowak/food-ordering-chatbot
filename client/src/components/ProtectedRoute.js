import React, { useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import axios from "../axios";
import { UserContext } from "./loginAndRegister/UserContext";

//Redirect component redirectuje do innej lokacji gdy sie nie uda zalogowac?

function ProtectedRoute({ /*isAuth,*/ component: Component, ...rest }) {
  const { isAuth, setIsAuth } = useContext(UserContext);

  //ten komponent bedzie sprawdzal czy user jest zalogowany i puszczal dalej
  //propsy dajemy wstepnie takie ktore moze uzyjemy
  //let isAuthorised = false;

  return (
    <Route
      {...rest}
      render={(props) => {
        //chce sobie zweryfikowac token

        axios
          .get("/user", { withCredentials: true })
          .then((res) => {
            // console.log("zweryfikowano token - OK " + res.data.isAuth);
            setIsAuth(res.data.isAuth);
          })
          .catch(() => {
            axios.post("/logout", {}, { withCredentials: true }).then();
          });

        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
          // bedzie chyba '/login' tutaj zamiast 'register'
          //props.location zawiera info skad wywolalismy ten protected component
        }
      }}
    />
  );
}

export default ProtectedRoute;
