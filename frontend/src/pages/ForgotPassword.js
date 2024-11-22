import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  
  const [isotpDisable, setotpDisable] = useState(true);//by defult otp input field is disable , its enable when i click a otp button
  const [isuidaiDisable, setUidaiDisable] = useState(false);//by default uidai fied is enable after go in otp input field then uidai input field is disable
  //this state take otp from otp input field
  const [digit, setDigit] = useState({
    code: "",
  });

  //when i give a uidai no in an uidai input field then this value are store in otp variable
  const [otp, setOtp] = useState({
    uidaiNo: "",
  });

  const navigate = useNavigate();

  //responsible for send  A mail for forgot a password
  const sendOtp = async (e) => {
    e.preventDefault(); //without reload browser
    setotpDisable(false);  //bydefault otp input field is disable when now after pressing a otp button its enable
    setUidaiDisable(true); //still now the uidai input field is enable after pressing a otp button its disable
    const { uidaiNo } = otp; //uidai no fetch from otp state
    if (!uidaiNo) {
      return handleError("All field are require");
    }

    try {
      //backend http url where user data store that are create in a node
      const url = "https://vote-now-api3902.vercel.app/user/profile/sendmail";
      //const url = "http://localhost:8000/user/profile/sendmail"; //this is  a url for send a mail

      //this method store the 4 digit otp in otp table in db
      const responseRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(otp),
      });
      const result = await responseRes.json();
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  //after give a uidaiNo and otp its go to a change password component
  const submitOtp = async (e) => {
    e.preventDefault(); //without reload browser
    const { uidaiNo } = otp;
    const { code } = digit;
    if (!uidaiNo || !code) {
      return handleError("All field are require");
    }
    navigate("/profile/change-password", { state: { uidaiNo, code } }); //go to this url with uidaiNo and otp code
  };
  //responsible for handle change in a uidaiNo input field
  const handleChange = async (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copyOtp = { ...otp };
    copyOtp[name] = value;
    setOtp(copyOtp);
  };
  //responsible for handle change in a otp input field
  const handleOtp = async (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copyOtp = { ...digit };
    copyOtp[name] = value;
    setDigit(copyOtp);
  };

  return (
    <div>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <a href="#">
              <img src="\logo.png" alt="logo" class="w-40 mb-8 mx-auto block" />
            </a>

            <div className="p-8 rounded-2xl bg-white shadow">
              <h2 className="text-gray-800 text-center text-2xl font-bold">
                Forgot Password
              </h2>
              <form className="mt-8 space-y-3" onSubmit={submitOtp}>
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
                      disabled={isuidaiDisable}
                      className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter Aadhar No."
                      value={otp.uidaiNo}
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
                  <div className="relative flex items-center">
                    <input
                      onChange={handleOtp}
                      name="code"
                      type="text"
                      required
                      disabled={isotpDisable}
                      className="w-[180px] text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                      placeholder="Enter OTP"
                      value={digit.code}
                    />
                    <label className="text-gray-800 text-sm mb-2 ml-6 block">
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        OTP
                      </button>
                    </label>
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
