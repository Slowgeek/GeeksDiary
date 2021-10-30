import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";
const Relogin = () => {
  const { dispatch } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("verifiedUser"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      if (
        history.location.pathname.startsWith("/login") ||
        history.location.pathname.startsWith("/signup")
      ) {
        history.push("/");
      }
    } else {
      history.push("/login");
    }
  }, []);
  return <div></div>;
};

export default Relogin;
