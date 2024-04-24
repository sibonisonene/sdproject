// PrivateRoute.js

import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Assuming this is the correct path

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
