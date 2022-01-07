import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import axios from "../axios";
import { UserContext } from "./loginAndRegister/UserContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuth, setIsAuth } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        axios
          .get("/user", { withCredentials: true })
          .then((res) => {
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
        }
      }}
    />
  );
}

export default ProtectedRoute;
