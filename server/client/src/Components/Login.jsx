import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const axios = require("axios");

const Login = () => {
  const { dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const Login = async () => {
    try {
      if (username.length < 3 || username.length > 15) {
        alert("Name length be from 3 to 15 characters", 2);
        return;
      }

      if (password.length < 5) {
        alert("Length of the password must be at least 5", 2);
        return;
      }

      const response = await axios.post("/signin", {
        username: username,
        password: password,
      });
      console.log(response);
      console.log(response.data);
      localStorage.setItem("loggedUser", JSON.stringify(response.data));
      dispatch({ type: "USER", payload: response.data });
      history.push("/");
      // Toast(response.data.message, 1);
      // Toast("LoggedIn Successfully", 1);
    } catch (err) {
      console.log(err.response.data);
      // Toast(err.response.data.error, 2);
      // Toast(err.response.data.message, 2);
    }
  };
  return (
    <div>
      <div className="my-16 w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Geek Diary 📗
        </h1>

        <form className="mt-6">
          <div>
            <label
              for="username"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                for="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              {/* <a
                href="#"
                className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >
                Forget Password?
              </a> */}
            </div>

            <input
              type="password"
              id="password"
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                Login();
              }}
              className="w-full px-4 py-2 tracking-wide text-secondary transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>

       

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
