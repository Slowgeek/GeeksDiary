import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";
function ProtectedRoute({ component: Component, ...rest }) {
  const { state, dispatch } = useContext(UserContext);

  console.log(state);

  return (
    <Route
      {...rest}
      render={(props) =>
        state ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
