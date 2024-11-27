import React from "react";
import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

//responsible for show a modala and delete the electors details
function DeleteModal({ closeModal, sendId }) {
  const navigate=useNavigate()
  //submit detlete details
  const [deleteInfo, setDeleteInfo] = useState({
    name: "",
    uidaiNo: "",
  });
  //automatic fetch the electors data when i click delete button and place them into 'deleteInfo' state
  useEffect(() => {
    // Function to fetch update data
    const fetchProfileData = async () => {
      try {
        const url=`https://vote-now-api3902.vercel.app/electors/profile/${sendId}`;
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
        setDeleteInfo({
          name: profileData.name || "",
          uidaiNo: profileData.uidaiNo || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [sendId]); // Dependency array to reurun if `value` changes

  //responsible for from input handle and store in a db in nodejs
  const handleDelete = async (e) => {
    e.preventDefault(); //without reload browser

    try {
      //backend http url where user data store that are create in a node

      const url = `https://vote-now-api3902.vercel.app/electors/delete/${sendId}`;
      //const url = `http://localhost:8000/electors/delete/${sendId}`;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
        //body: JSON.stringify(editInfo),
      });
      const result = await response.json();
      const { error } = result;
      console.log(result);
      if (error) {
        handleError(error);
      } else {
        handleSuccess("delete successfully");
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
    const copyeditInfo = { ...deleteInfo };
    copyeditInfo[name] = value;
    setDeleteInfo(copyeditInfo);
  };

  return (
    <>
      {/* modal-wrapper and modal-container is a css class */}

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-3 modal-wrapper">
        <div className="max-w-md w-full modal-container">
          <div className="p-8 rounded-2xl bg-white shadow">
            <div className="text-right text-gray-500">
              <button className="font-bold" onClick={closeModal}>
                X
              </button>
            </div>
            <h2 className="text-gray-700 text-center text-3xl font-bold pb-6">
              Delete Candidate
            </h2>
            <form onSubmit={handleDelete}>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    name="name"
                    readOnly
                    type="text"
                    className="text-gray-800 bg-gray-100 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter Name"
                    value={deleteInfo.name}
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
                    value={deleteInfo.uidaiNo}
                  />
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
