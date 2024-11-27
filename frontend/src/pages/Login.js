import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { ForgotPassword } from "./ForgotPassword";

function Login() {
  const [logininfo, setlogininfo] = useState({
    uidaiNo: "",
    password: "",
  });

  const navigate = useNavigate();

  //responsible for from input handle and store in a db in nodejs
  const handleLogin = async (e) => {
    e.preventDefault(); //without reload browser
    const { uidaiNo, password } = logininfo;
    if (!uidaiNo || !password) {
      return handleError("All field are require");
    }

    try {
      //backend http url where user data store that are create in a node
      const url = "https://vote-now-api3902.vercel.app/user/login";
      //const url = "http://localhost:8000/user/login";
      const responseRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logininfo),
      });
      const result = await responseRes.json();
      console.log(result);

      const { token, message, error, response } = result;

      //if the given dtals is user
      if (response.role === "voter") {
        if (token) {
          handleSuccess(message);

          setTimeout(() => {
            navigate("/home");
          }, 1000);
          localStorage.setItem("loggedToken", token);
          localStorage.setItem("loggedinName", response.name);
        } 
        else{
      
          handleError(message);
        }
      }

      //if the given details is admin
      if (response.role === "admin") {
        if (token) {
          handleSuccess(message);

          setTimeout(() => {
            navigate("/admin-profile");
          }, 1000);
          localStorage.setItem("loggedToken", token);
          localStorage.setItem("loggedinName", response.name);
        } else if (error) {
          const details = error?.details[0].message;
          handleError("Admin can not found");
        } else {
          return handleError("Admin Not exist");
        }
      }
    } catch (err) {
      return handleError("internal server error");
    }
  };

  //this function is responsible for store a value in useState hook array when i given a input in a form
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copylogininfo = { ...logininfo };
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  };

  return (
    <div>
      <div className="bg-gray-50 font-[sans-serif]">
        <div
          classname="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('background1.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full">
              <a href="#">
                <img
                  src="\logo.png"
                  alt="logo"
                  class="w-40 mb-8 mx-auto block"
                />
              </a>

              <div className="p-8 rounded-2xl bg-white shadow">
                <h2 className="text-gray-800 text-center text-2xl font-bold">
                  Sign in
                </h2>
                <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      UIDAI NO.
                    </label>
                    <div className="relative flex items-center">
                      <input
                        onChange={handleChange}
                        name="uidaiNo"
                        type="number"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter Aadhar No."
                        value={logininfo.uidaiNo}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-4 h-4 absolute right-4"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        required
                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                        placeholder="Enter password"
                        value={logininfo.password}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#bbb"
                        stroke="#bbb"
                        className="w-4 h-4 absolute right-4 cursor-pointer"
                        viewBox="0 0 128 128"
                      >
                        <path
                          d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        for="remember-me"
                        className="ml-3 block text-sm text-gray-800"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        href="jajvascript:void(0);"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        <div className="text-sm">
                          <button
                            type="button"
                            className="text-blue-600 hover:underline font-semibold"
                            onClick={() => navigate("/profile/forgot-password")}
                          >
                            Forgot your password?
                          </button>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="text-gray-800 text-sm !mt-8 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
