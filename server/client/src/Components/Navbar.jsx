// import { ArrowRightIcon, MenuIcon } from "@heroicons/react/solid";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  function handleClick() {
    setisOpen(!isOpen);
  }
  return (
    <header className="bg-secondary md:sticky top-0 z-10 ">
      <div className="flex p-5 jusitfy-start">
        <div className="">
          <button
            type="button"
            className="mr-5 justify-end "
            onClick={handleClick}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {isOpen && (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              )}
              {!isOpen && (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>{" "}
        <div className="mx-auto text-primary text-2xl ">Geek Diary 📗 </div>
        <div className="text-left"></div>
      </div>
      <nav
        className={` ${
          isOpen ? "block" : "hidden"
        } divide-y divide-yellow-500  top-16 left-0  z-40 flex flex-col  font-semibold w-full shadow-md  p-6 pt-2 `}
      >
        <Link to="/learning" className="mr-5   my-2 hover:text-white ">
          Create Notes
        </Link>{" "}
        <Link to="/mynotes" className="mr-5   my-2 hover:text-white ">
          All Notes
        </Link>
        <Link to="/todaynotes" className="mr-5   my-2 hover:text-white ">
          Today Revision Notes
        </Link>
        <button
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/sawo");
          }}
          href="#Motivates"
          className="mr-5 hover:text-white"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
