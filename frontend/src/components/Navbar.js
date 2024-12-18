import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "./../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const [loggedinInfo, setLoggedininfo] = useState("");

  useEffect(() => {
    setLoggedininfo(localStorage.getItem("loggedinName")); //loggedinName is a key value where loggedin information are store
  });

  const navigate = useNavigate();

  //function for delete token from localstorage (logout function)
  const handleLogout = async (e) => {
    localStorage.removeItem("loggedToken"); //remove loggedin token
    localStorage.removeItem("loggedinName"); //remove logged in name
    handleSuccess("logout successfully"); //alert message
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div>
      <nav className="bg-gray-900 text-white fixed w-full z-20 top-0 start-0 border-b border-gray-700 h-[70px] shadow-md">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full px-4">
          <a href="#" className="flex items-center rtl:space-x-reverse">
            <div className=" ">
              <span
                className="flex items-center justify-center w-14 h-14 text-3xl font-semibold text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full shadow-lg"
                title={loggedinInfo}
              >
                {(loggedinInfo || " ").substring(0,2).toUpperCase()} {/*there are budefault loggedinInfo is null when i set a name in this variable then it set a name */}

                {/*to show loggedin name (only frist two character) in right side in home page */}
              </span>
            </div>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
