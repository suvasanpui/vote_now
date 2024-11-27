import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ElectorsList() {
  const [showList, setShowList] = useState(""); ///for show electors
  

  //fetch all the electors record in a home page
  const fetchRecord = async () => {
    try {
      const url = "https://vote-now-api3902.vercel.app/electors";
      //const url = "http://localhost:8000/electors";
      //this is function to gat a token from localstorage
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
        "Content-Type": "application/json",
      };
      const responseRes = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const result = await responseRes.json();
      console.log(result);
      setShowList(result.response);
    } catch (err) {
      handleError(err);
    }
  };

  //when i click a vote button then its get elector id and the update record in a electos collection
  const handleVote = async (e) => {
    const { value } = e.target;
    try {
      const url=`https://vote-now-api3902.vercel.app/electors/votes/${value}`;
      //const url = `http://localhost:8000/electors/votes/${value}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
        "Content-Type": "application/json",
      };
      const responseRes = await fetch(url, {
        method: "POST",
        headers: headers,
      });
      if (responseRes.ok) {
        const result = await responseRes.json();
        console.log(result, "Vote Successfully");
        handleSuccess("voted successfully");
        fetchRecord();
      } else {
        handleError("Internal server Error");
      }
    } catch (err) {
      handleError("Internal server error");
    }
  };

  useEffect(() => {
    fetchRecord();
    
  }, []);

  return (
    <div>
      <div className="px-3 py-3 bg-slate-600">
        {/* Add horizontal scrolling wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-max text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2">
                  Name
                </th>
                <th scope="col" className="px-4 py-2">
                  Party
                </th>
                <th scope="col" className="px-4 py-2">
                  Participate
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(showList) &&
                showList.map((data, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-70"
                    key={index}
                  >
                    <td className="px-4 py-2">{data.name}</td>
                    <td className="px-4 py-2">{data.party}</td>
                    <td className="px-4 py-2">
                      <button
                        name={data.party}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-7"
                        value={data.id}
                        title="Give Vote"
                        onClick={handleVote}
                      >
                        Vote
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ElectorsList;
