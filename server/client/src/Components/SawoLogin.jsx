import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Components/Toast/Toast";

import Sawo from "sawo";
import { UserContext } from "../App";

import "./SawoLogin.css";
const axios = require("axios");

// const API_KEY = process.env.REACT_APP_API_KEY;

const Login = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [payload, setPayload] = useState({});
  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const Register = async (payload) => {
    try {
      console.log(payload.customFieldInputValues.Username, payload.identifier);
      const response = await axios.post("/signup", {
        username: payload.customFieldInputValues.Username,
        email: payload.identifier,
      });
      console.log(response);
      console.log(response.data);
      Toast("New User Registered Login Again", 1);
      setTimeout(function () {
        window.location.reload(true);
      }, 3000);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      // alert(err.response.data.error, 2);
      // alert(err.response.data.message, 2);
    }
  };

  const SendPayload = async (payload) => {
    try {
      const response = await axios.post("/sawo", {
        payload,
      });
      console.log(response);
      if (response.data.newUser === true) {
        Register(payload);
      }
      if (response.data.newUser === false) {
        localStorage.setItem("verifiedUser", JSON.stringify(response.data));
        dispatch({ type: "USER", payload: response.data });
        history.push("/");
        Toast("Login Successful", 1);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  useEffect(() => {
    var config = {
      containerID: "sawo-container",
      identifierType: "email",
      apiKey: "f91cb755-32c1-4271-9bc0-4969970b8382",
      onSuccess: (payload) => {
        setUserLoggedIn(true);
        setPayload(payload);
        console.log(payload);
        SendPayload(payload);
        // history.push("/");
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
  }, []);

  return (
    <div className="containerStyle">
      <section>
        {!isUserLoggedIn ? (
          <div
            className="formContainer h-auto"
            id="sawo-container"
            style={{ height: "600px", width: "315px", borderRadius: "10px" }}
          ></div>
        ) : (
          <div className="loggedin">
            <h2>User Successfully Registerd</h2>
          </div>
        )}
      </section>
    </div>
  );
};

export default Login;
