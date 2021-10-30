import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Toast from "../Components/Toast/Toast";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import es from "date-fns/locale/es";
// registerLocale("es", es);
const axios = require("axios");
const EditLearning = () => {
  const { noteId } = useParams();
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

  const [data, setData] = useState();

  const FetchData = async () => {
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
      const allNotes = response.data[0];
      setData(allNotes);
      console.log(response);
      console.log(response.data[0]);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const UpdateNote = async () => {
    try {
      const response = await axios.patch(
        "/editnotes",
        {
          noteId,
          newdata: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(localStorage.getItem("verifiedUser"))
              .accessToken,
          },
        }
      );
      history.push(`/displaylearning/${noteId}`);
      Toast("Notes Updated", 1);
      console.log(response);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div className="bg-neutral-200 w-full ">
      <Navbar />
      {data ? (
        <section className="mt-4 mx-4 max-w-4xl p-6 md:mx-auto  bg-secondary rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Learning
          </h2>

          <form className="w-full">
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
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
                  value={data.topic}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      topic: e.target.value,
                    }))
                  }
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
                  value={data.level}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      level: e.target.value,
                    }))
                  }
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
                  value={data.problem}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      problem: e.target.value,
                    }))
                  }
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
                  value={data.notes}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      notes: e.target.value,
                    }))
                  }
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
                value={data.quick_rev}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    quick_rev: e.target.value,
                  }))
                }
                className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="tag">
                Tags
              </label>
              <input
                id="tag"
                type="text"
                value={data.tags}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    tags: e.target.value.split(","),
                  }))
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-200" htmlFor="due">
                Revision Date
              </label>
              <DatePicker
                id="due"
                placeholder="dasdsad"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                selected={new Date(data.revision_date)}
                onChange={(date) => {
                  setData((prevState) => ({
                    ...prevState,
                    revision_date: new Date(date).toISOString(),
                    revised: false,
                  }));
                }}
                showTimeSelect
                dateFormat="Pp"
              />
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  UpdateNote();
                }}
                className="px-6 py-2 leading-5 bg-primary text-white transition-colors duration-200 transform  rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Update Note 🕐
              </button>
            </div>
          </form>
        </section>
      ) : (
        "Loading ...."
      )}
    </div>
  );
};

export default EditLearning;
