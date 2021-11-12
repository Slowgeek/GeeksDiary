import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const axios = require("axios");
const Home = () => {
  const { state } = useContext(UserContext);
  const UpdateTodayList = async () => {
    try {
      const response = await axios.get("/home", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      console.log("after request");

      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {
    UpdateTodayList();
  }, []);
  return (
    <div className="bg-neutral-200 h-screen md:h-full dark:bg-gray-800">
      <div className=" md:h-screen">
        <div className="mx-auto mb-10 text-center transform text-2xl h-12 w-1/5 transition duration-500 text-primary font-mono py-10 hover:scale-125">
          Geeks Diary 📗
        </div>
        <div className="flex md:flex-row flex-col justify-around ">
          <div className="m-auto ">
            <div className="h-80 relative max-w-sm bg-primary rounded-lg  shadow-lg my-8 px-10 md:px-20">
              <h2 className="text-2xl text-center pt-8 pb-5 	">
                Welcome{" "}
                {state
                  ? state.username[0].toUpperCase() +
                    state.username.substring(1).toLowerCase()
                  : ""}
                {}
                <br /> What Would you like to do Today{" "}
              </h2>
              <Link
                to="/mynotes"
                className="transform transition duration-500 text-primary hover:scale-125 absolute text-2xl right-1 top-1"
              >
                📜
              </Link>
              <div className="flex justify-center item-center">
                <Link
                  to="/learning"
                  className={
                    "transform transition duration-500 text-primary hover:scale-125 w-40 my-4 py-2 px-5 text-center  bg-secondary hover:text-primary rounded hover:bg-neutral-700 active:bg-secondary"
                  }
                >
                  Add Today's Learning
                </Link>
              </div>{" "}
              <div className="flex justify-center item-center">
                {" "}
                <br />
                <Link
                  to="/todaynotes"
                  className={
                    "transform transition duration-500 text-primary hover:scale-125 w-40 my-4 py-2 px-4 text-center bg-secondary hover:text-primary rounded hover:bg-neutral-700 active:bg-secondary"
                  }
                >
                  Revise Concept{" "}
                </Link>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
