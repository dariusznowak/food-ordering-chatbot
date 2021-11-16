import React from "react";
import { Route, Redirect } from "react-router-dom";
//Redirect component redirectuje do innej lokacji gdy sie nie uda zalogowac?

function ProtectedRoute({ isAuth, component: Component, ...rest }) {
  //ten komponent bedzie sprawdzal czy user jest zalogowany i puszczal dalej
  //propsy dajemy wstepnie takie ktore moze uzyjemy

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{ pathname: "/register", state: { from: props.location } }}
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
