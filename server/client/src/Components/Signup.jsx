import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const Register = async () => {
    try {
      if (username.length < 3 || username.length > 15) {
        alert("Name length be from 3 to 15 characters", 2);
        return;
      }
      if (
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        alert("Invalid Email", 2);
        return;
      }
      if (password.length < 5) {
        alert("Length of the password must be at least 5", 2);
        return;
      }

      const response = await axios.post("/signup", {
        username: username,
        email: email,
        password: password,
      });
      console.log(response);
      console.log(response.data);
      history.push("/login");
      // alert(response.data.message, 1);
    } catch (err) {
      console.log(err.response.data);
      // alert(err.response.data.error, 2);
      // alert(err.response.data.message, 2);
    }
  };
  return (
    <div>
      <div className="my-6 w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800">
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
          </div>{" "}
          <div className="mt-4">
            <label
              for="username"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                Register();
              }}
              className="w-full px-4 py-2 tracking-wide text-secondary transition-colors duration-200 transform bg-neutral-700 rounded-md hover:bg-neutral-600 focus:outline-none focus:bg-neutral-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Already have an account? Log in{" "}
          <Link
            to="/login"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
