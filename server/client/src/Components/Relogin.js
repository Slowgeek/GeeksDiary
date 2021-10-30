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
      if (history.location.pathname.startsWith("/sawo")) {
        history.push("/");
      }
    } else {
      history.push("/sawo");
    }
  }, []);
  return <div></div>;
};

export default Relogin;
