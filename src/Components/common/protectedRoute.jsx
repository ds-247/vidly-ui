import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(prop) => {
        if (!auth.getCurrentUser()) return <Redirect to="/login-form" />;
        else return Component ? <Component {...prop} /> : render(prop);
      }}
    />
  );
}

export default ProtectedRoute;
