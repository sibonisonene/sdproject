import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Adjust the import path as needed

const PrivateRoute = ({ component: Component, isAdminRoute = false, ...rest }) => {
  const { authUser } = useContext(AuthContext);

  const checkAccess = () => {
    if (!authUser) {
      return false; // Not logged in at all
    }
    if (isAdminRoute && !authUser.isAdmin) {
      return false; // Needs to be admin, but isn't
    }
    return true; // Logged in, and either doesn't need to be admin or is admin
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        checkAccess() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
