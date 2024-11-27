import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//responsible for show a modala and update the electors details
function UpdateModal({ closeModal, sendId , source}) {
  //submit update details
  const [editInfo, seteditInfo] = useState({
    name: "",
    age: "",
    email: "",
    contact: "",
    address: "",
    uidaiNo: "",
    party: "",
  });

  //automatic fetch the electors data when i click edit button and place them into 'editInfo' state
  useEffect(() => {
    // Function to fetch update data
    const fetchProfileData = async () => {
      try {
        const url=`https://vote-now-api3902.vercel.app/electors/profile/${sendId}`
        //const url = `http://localhost:8000/electors/profile/${sendId}`;
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
          "Content-Type": "application/json",
        };
        const responseRes = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        const profileData = await responseRes.json();
        console.log(profileData);
        seteditInfo({
          name: profileData.name || "",
          age: profileData.age || "",
          email: profileData.email || "",
          contact: profileData.contact || "",
          address: profileData.address || "",
          uidaiNo: profileData.uidaiNo || "",
          party: profileData.party || " ",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [sendId]); // Dependency array to re-run if `value` changes

  const navigate = useNavigate();

  //responsible for from input handle and store in a db in nodejs
  const handleUpdate = async (e) => {
    e.preventDefault(); //without reload browser

    try {
      //backend http url where user data store that are create in a node

      const url = `https://vote-now-api3902.vercel.app/electors/update/${sendId}`
      //const url = `http://localhost:8000/electors/update/${sendId}`;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(editInfo),
      });
      const result = await response.json();
      const { error } = result;
      console.log(result);
      if (error) {
        handleError(error);
      } else {
        handleSuccess("Update successfully");
        setTimeout(() => {
          navigate(closeModal(true))
        }, 1000);
      }
    } catch (err) {
      handleError(err);
    }
  };

  //this function is responsible for store a value in useState hook array when i given a input in a form
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name,value);
    const copyeditInfo = { ...editInfo };
    copyeditInfo[name] = value;
    seteditInfo(copyeditInfo);
  };

  return (
    <>
      {/* modal-wrapper and modal-container is a css class */}

      <div className="min-h-screen flex-col items-center justify-center py-6 px-3 flex">
        <div className="max-w-md w-full modal-container mt-0">
          <div className="p-8 rounded-2xl bg-white shadow">
            <div className="text-right text-gray-500">
              <button className="font-bold" onClick={closeModal}>
                X
              </button>
            </div>
            {source==="UpdateModal" ? (<h2 className="text-gray-700 text-center text-3xl font-bold pb-6">
              Update Candidate
            </h2>) : <h2 className="text-gray-700 text-center text-3xl font-bold pb-6">
              View Candidate
            </h2>}
            
            <form onSubmit={handleUpdate}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    className="text-gray-800 bg-gray-100 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Name"
                    value={editInfo.name}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Age
                  </label>
                  <input
                    onChange={handleChange}
                    name="age"
                    type="number"
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Age"
                    value={editInfo.age}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Email Id
                  </label>
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    value={editInfo.email}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Contact No.
                  </label>
                  <input
                    onChange={handleChange}
                    name="contact"
                    type="text"
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Contact No."
                    value={editInfo.contact}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Address
                  </label>
                  <input
                    onChange={handleChange}
                    name="address"
                    type="text"
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Address"
                    value={editInfo.address}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Addhar No.
                  </label>
                  <input
                    onChange={handleChange}
                    name="uidaiNo"
                    type="number"
                    readOnly
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Addhr No."
                    value={editInfo.uidaiNo}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Party
                  </label>
                  <input
                    onChange={handleChange}
                    name="party"
                    type="text"
                    className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter party"
                    value={editInfo.party}
                  />
                </div>
              </div>

              {source==="UpdateModal" && (<div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Update
                </button>
              </div>)}
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateModal;
