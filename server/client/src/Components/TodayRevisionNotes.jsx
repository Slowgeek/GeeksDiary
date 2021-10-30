import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
const axios = require("axios");
const TodayRevisionNotes = () => {
  const [notes, setNotes] = useState(null);
  const [due, setDue] = useState(null);

  const FetchNotes = async () => {
    try {
      const response = await axios.get("/today", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
            .accessToken,
        },
      });
      console.log(response);
      console.log(response.data);
      const allNotes = response.data.notes.noteToReviseToday;
      setNotes(allNotes);
      const dueNotes = response.data.due;
      setDue(dueNotes);
      // console.log(notes);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {
    FetchNotes();
  }, []);

  return (
    <div>
      <Navbar />
      <h1 className="max-w-2xl px-8 m-4 py-4 mx-auto bg-primary rounded-lg shadow-md dark:bg-gray-800">
        Today
      </h1>
      {notes ? (
        notes.length === 0 ? (
          <div>No Notes to Revise Today</div>
        ) : (
          notes.map((note) => {
            return (
              <>
                <Link to={`/displaylearning/${note._id}`}>
                  <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="rounded text-sm font-light text-gray-600 dark:text-gray-400">
                        {Intl.DateTimeFormat("en-US", {
                          day: "numeric",
                          year: "numeric",
                          month: "long",
                          weekday: "long",
                        }).format(new Date(note.revision_date))}
                      </span>
                      <h1 className=" px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                        {note.level}
                      </h1>
                    </div>

                    <div className="mt-2">
                      <h1
                        href="#"
                        className=" text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                      >
                        {note.problem.substring(0, 100)}...
                      </h1>
                      <p className="p-2 bg-green-200 rounded mt-2 text-gray-600 dark:text-gray-300">
                        <div>{note.quick_rev.substring(0, 300)}</div>
                      </p>
                    </div>

                    <div className=" flex items-center justify-between mt-4">
                      <h1
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Read more
                      </h1>

                      <div className=" flex items-center">
                        <h1 className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                          #{note.tags[0]}#{note.tags[1]}#{note.tags[2]}#
                          {note.tags[3]}..
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })
        )
      ) : (
        <div className="animate-pulse max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm bg-primary rounded h-6  px-24 font-light text-gray-600 dark:text-gray-400"></span>
            <h1 className="p-2 bg-green-200 rounded  h-6 px-10 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"></h1>
          </div>

          <div className="mt-2">
            <h1 className="p-2 bg-green-200 rounded h-8  text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"></h1>
            <p className="p-2 bg-green-200 rounded h-32 mt-2 text-gray-600 dark:text-gray-300"></p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <h1 className="p-2 bg-green-200 rounded h-4 px-20 text-blue-600 dark:text-blue-400 hover:underline"></h1>

            <div className="flex items-center">
              <h1 className="p-2 bg-green-200 rounded h-4 px-14 font-bold text-gray-700 cursor-pointer dark:text-gray-200"></h1>
            </div>
          </div>
        </div>
      )}{" "}
      <h1 className="max-w-2xl px-8 py-4 m-4 mx-auto bg-primary rounded-lg shadow-md dark:bg-gray-800">
        Previous
      </h1>
      {due
        ? due.map((d) => {
            console.log(d);
            return (
              <>
                <Link to={`/displaylearning/${d._id}`}>
                  <div className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="rounded text-sm font-light text-gray-600 dark:text-gray-400">
                        {Intl.DateTimeFormat("en-US", {
                          day: "numeric",
                          year: "numeric",
                          month: "long",
                          weekday: "long",
                        }).format(new Date(d.revision_date))}
                      </span>
                      <h1 className=" px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                        {d.level}
                      </h1>
                    </div>

                    <div className="mt-2">
                      <h1
                        href="#"
                        className=" text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
                      >
                        {d.problem.substring(0, 100)}...
                      </h1>
                      <p className="p-2 bg-green-200 rounded mt-2 text-gray-600 dark:text-gray-300">
                        <div>{d.quick_rev.substring(0, 300)}</div>
                      </p>
                    </div>

                    <div className=" flex items-center justify-between mt-4">
                      <h1
                        href="#"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Read more
                      </h1>

                      <div className=" flex items-center">
                        <h1 className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">
                          #{d.tags[0]}#{d.tags[1]}#{d.tags[2]}#{d.tags[3]}
                          ..
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })
        : ""}
    </div>
  );
};

export default TodayRevisionNotes;
