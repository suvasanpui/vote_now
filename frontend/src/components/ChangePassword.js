import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function ChangePassword() {
  //take uidaiN and password from forgotPassword page
  const location = useLocation();
  const { uidaiNo, code } = location.state || {};

  const [otp, setOtp] = useState({
    uidaiNo: uidaiNo || "",
    code: code || "",
    newPassword: "",
  });

  const navigate = useNavigate();

  //responsible for send  A mail for forgot a password
  const submitPassword = async (e) => {
    e.preventDefault(); //without reload browser
    const { uidaiNo, code, newPassword } = otp;
    if (!newPassword || !uidaiNo || !code) {
      return handleError("All field are require");
    }

    try {
      //backend http url where user data store that are create in a node

      const url = "https://vote-now-api3902.vercel.app/user/profile/changepassword";
      //const url = "http://localhost:8000/user/profile/changepassword"; //password change in this url
      const responseRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otp),
      });
      const result = await responseRes.json();
      console.log(result);
      handleSuccess("Password update Successfully");
      setTimeout(() => {
        navigate("/login"); //then redirect to login page
      }, 1000);
    } catch (err) {
      return handleError(err);
    }
  };
  //after give

  //responsible for handle change in a password input field
  const handleChange = async (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copyPassword = { ...otp };
    copyPassword[name] = value;
    setOtp(copyPassword);
  };

  return (
    <div>
      <div class="bg-gray-50 font-[sans-serif]">
        <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div class="max-w-md w-full">
            <div class="p-8 rounded-2xl bg-white shadow">
              <h2 class="text-gray-800 text-center text-2xl font-bold">
                Set Password
              </h2>
              <form class="mt-8 space-y-4" onSubmit={submitPassword}>
                <div>
                  <label class="text-gray-800 text-sm mb-2 block">
                    Password
                  </label>
                  <div class="relative flex items-center">
                    <input
                      onChange={handleChange}
                      name="newPassword"
                      type="password"
                      required
                      class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter New Pssword"
                      value={otp.newPassword}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      class="w-4 h-4 absolute right-4"
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

                <div class="!mt-8">
                  <button
                    type="submit"
                    class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
