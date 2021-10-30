import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Toast from "./Toast/Toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
const axios = require("axios");
const DisplayLearning = () => {
  const { noteId } = useParams();
  const [notes, setNotes] = useState(null);
  const history = useHistory();
  const FetchNote = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/displaynotes",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("verifiedUser"))
            .accessToken,
        },
        params: {
          noteId,
        },
      });

      // history.push("/editlearning");
      const allNotes = response.data;
      setNotes(allNotes);
      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  const Revised = async () => {
    try {
      const response = await axios.patch(
        "/revised",
        {
          noteId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("verifiedUser"))
              .accessToken,
          },
        }
      );
      // history.push(`/displaylearning/${noteId}`);
      Toast("Notes Revised", 1);
      history.goBack();
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {
    FetchNote();
  }, []);
  return (
    <div className="bg-neutral-200 w-full dark:bg-gray-600">
      <Navbar />
      {notes
        ? notes.map((note) => {
            return (
              <section className="mt-4 mx-4 max-w-4xl p-6 md:mx-auto  bg-secondary rounded-md shadow-md dark:bg-gray-800">
                <div className="flex w-full justify-between  mt-6 ">
                  <div className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Revision
                  </div>

                  <Link
                    to={`/editlearning/${noteId}`}
                    className=" px-6 py-2 leading-5 bg-primary text-white transition-colors duration-200 transform  rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Edit 🕐
                  </Link>
                </div>

                {/* <div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
              <div class="mt-2">
                <p class="mt-2 text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                </p>
              </div>
            </div> */}
                <form className="w-full">
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="topic"
                      >
                        Topics
                      </label>
                      <div
                        id="topic"
                        type="text"
                        className="whitespace-pre-wrap max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        {note.topic}
                      </div>
                    </div>
                    <div>
                      <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="level"
                      >
                        Level
                      </label>
                      <div
                        id="topic"
                        type="text"
                        className="whitespace-pre-wrap max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800"
                      >
                        {note.level}{" "}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="problem"
                      >
                        Problem
                      </label>{" "}
                      <div
                        id="problem"
                        className="whitespace-pre-wrap block  px-4 py-2 text-gray-700 bg-white   mx-auto  rounded-lg shadow-md dark:bg-gray-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 "
                      >
                        {note.problem}
                      </div>
                    </div>
                    <div className="w-full mt-4">
                      <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="notes"
                      >
                        Notes
                      </label>{" "}
                      <div
                        id="notes"
                        className="whitespace-pre-wrap block  px-4 py-2 text-gray-700 bg-white   mx-auto  rounded-lg shadow-md dark:bg-gray-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 "
                      >
                        {note.notes}
                      </div>
                    </div>{" "}
                  </div>
                  <div className="w-full mt-4">
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="quick"
                    >
                      Quick Revision
                    </label>
                    <div
                      id="quick"
                      className="whitespace-pre-wrap block h-auto px-4 py-2 text-gray-700 bg-white   mx-auto  rounded-lg shadow-md dark:bg-gray-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 "
                    >
                      {note.quick_rev}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="code"
                    >
                      Code
                    </label>{" "}
                    <SyntaxHighlighter
                      wrapLines={true}
                      language="javascript"
                      style={a11yDark}
                      showLineNumbers
                    >
                      {note.code}
                    </SyntaxHighlighter>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="due"
                    >
                      Tags
                    </label>
                    <div className="block h-auto px-4 py-2 text-gray-700 bg-white   mx-auto  rounded-lg shadow-md dark:bg-gray-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                      <ul className="flex flex-wrap mt-2">
                        {note.tags.map((tag, index) => (
                          <li
                            key={index}
                            style={{ backgroundColor: "green" }}
                            className={`flex-center flex font-bold text-sm rounded-full px-3 py-1 m-1 opacity-80 hover:opacity-100`}
                          >
                            <span>#{tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <label
                      className="text-gray-700 dark:text-gray-200"
                      htmlFor="due"
                    >
                      Revision Date
                    </label>
                    <div
                      id="due"
                      className="block h-10 px-4 py-2 text-gray-700 bg-white   mx-auto  rounded-lg shadow-md dark:bg-gray-800 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                    >
                      {" "}
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        day: "numeric",
                        month: "long",
                        weekday: "long",
                      }).format(new Date(note.revision_date))}
                    </div>
                  </div>{" "}
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        Revised();
                      }}
                      className="px-6 py-2 leading-5 bg-primary text-white transition-colors duration-200 transform  rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                      Revised 📝
                    </button>
                  </div>
                </form>
              </section>
            );
          })
        : "loading ....."}
    </div>
  );
};

export default DisplayLearning;
