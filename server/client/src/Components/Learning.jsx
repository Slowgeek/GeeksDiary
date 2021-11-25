import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Components/Toast/Toast";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Navbar from "./Navbar";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../App";

const axios = require("axios");
const Learning = () => {
  const { state } = useContext(UserContext);
  const history = useHistory();

  const options = [
    {
      label: "Hard",
      value: "Hard",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Easy",
      value: "Easy",
    },
  ];
  const [topic, setTopics] = useState("");
  const [level, setLevel] = useState("Medium");
  const [problem, setProblem] = useState("");
  const [notes, setNotes] = useState("");
  const [quickrev, setQuickrev] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState([""]);
  const [revisionDate, setRevisionDate] = useState();
  console.log(JSON.parse(localStorage.getItem("loggedUser")).accessToken);
  const Schedule = async () => {
    try {
      const response = await axios.post(
        "/schedule",
        {
          topic,
          level,
          problem,
          notes,
          quick_rev: quickrev,
          code,
          tags,
          revision_date: revisionDate,
          noted_by: state.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("loggedUser"))
              .accessToken,
          },
        }
      );
      // console.log(response);
      // console.log(response.data);
      history.push("/");
      Toast("Notes Sheduled Succesfully", 1);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="bg-neutral-200 w-full ">
      <Navbar />

      <section className="mt-4 mx-4 max-w-4xl p-6 md:mx-auto  bg-secondary rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-gray-100">
          Today's Learning
        </h2>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="topic"
              >
                Topics
              </label>
              <input
                id="topic"
                type="text"
                placeholder="Enter the Topic"
                value={topic}
                onChange={(e) => setTopics(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="level"
              >
                Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                {" "}
                {options.map((option, idx) => (
                  <option
                    key={idx}
                    className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="problem"
              >
                Problem
              </label>
              <textarea
                id="problem"
                type="text"
                placeholder="Enter the Problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="block w-full h-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="notes"
              >
                Notes / Algorithm
              </label>
              <textarea
                id="notes"
                type="text"
                placeholder="Enter the Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block w-full h-40 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="quick"
            >
              Quick Revision
            </label>
            <textarea
              id="quick"
              placeholder="Enter the Quick Revision Points"
              value={quickrev}
              onChange={(e) => setQuickrev(e.target.value)}
              className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div className="w-full mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="code"
            >
              Code
            </label>
            <CodeEditor
              value={code}
              language="cpp"
              placeholder="Enter the code if any"
              onChange={(e) => setCode(e.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: "#cfcfcf",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
            {/* <textarea
              id="code"
              placeholder="Enter the code if any"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea> */}
          </div>
          <div className="pt-1">
            <label className="text-gray-700 dark:text-gray-200" htmlFor="tag">
              Tags
            </label>
            <input
              id="tag"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value.split(","))}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="due">
              Revision Date
            </label>
            <DatePicker
              id="due"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              selected={revisionDate}
              minDate={new Date()}
              placeholderText="After 7 days (Default)"
              onChange={(date) => setRevisionDate(date)}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                Schedule();
              }}
              className="px-6 py-2 leading-5 bg-primary text-white transition-colors duration-200 transform  rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Shedule 🕐
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Learning;
