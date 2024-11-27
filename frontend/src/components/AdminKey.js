import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";
import { ImBin } from "react-icons/im";
import { FaStreetView } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


function ElectorsList() {
  const [showList, setShowList] = useState("");
  const [showModal, setShowModal] = useState(false); //for show popup when a click a edit button, by default popup is disable
  const [deleteElector, setDeleteElector] = useState(false); //for delete state,by default false
  const [deleteId, setDeleteId] = useState(""); //to get a specific id and pass deleteModal component for delete electors
  const [id, setId] = useState(""); //to get a specific id and pass updateModal component for update value in electors
  const [addModal,setAddModal]=useState(false); //to pass addModal component for add electors
  const [viewModal,setViewModal]=useState(false) //to get a specific id and pass viewModal component for view electors
  const [viewId,setViewId]=useState("") // this state is used for store  a id for viw the elector
  const [intervalId, setIntervalId] = useState(null); //this state is used for automatic fetch the data if any changes

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

  //to set elector id in a id state for edit electors
  const handleId = async (e) => {
    const { value } = e.target;
    console.log(value);
    setId(value);
  };

  //to set elector id in a deleteID state for delete electors
  const handleDeleteId = async (e) => {
    const { value } = e.target;
    console.log(value);
    setDeleteId(value);
  };

  //to set elector id in a deleteID state for delete electors
  const handleViewId = async (e) => {
    const { value } = e.target;
    console.log(value);
    setViewId(value);
  };

  
  useEffect(() => {
    fetchRecord();
    // Start polling
    const id = setInterval(fetchRecord, 3000); // Fetch record in every 3 seconds
    setIntervalId(id);

    // Cleanup interval on component unmount
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div>
        {/*show update popup for update electors and UpdateModal component*/}
        {showModal && (
          <UpdateModal closeModal={() => setShowModal(false)} sendId={id} source="UpdateModal"/> //pass id as a props  to updateModal component and update popup is enable
        )}
      </div>
      {/*show delete popup for delete electors and send to DeleteModal component */}
      <div>
        {deleteElector && (
          <DeleteModal
            closeModal={() => setDeleteElector(false)}
            sendId={deleteId}
          /> //pass id as a props  to deleteModal component and delete popup is enable
        )}
      </div>
      <div>
        {/*show add popup for add electors and send to AddModal component*/}
        {addModal && (
          <AddModal closeModal={() => setAddModal(false)}/> //pass id as a props  to updateModal component and update popup is enable
        )}
      </div>
      <div>
        {/*show view popup for view the information of electors and send to UpdateModal component */}
        {viewModal && (
          <UpdateModal closeModal={() => setViewModal(false)} sendId={viewId} /> //pass id as a props  to updateModal component and update popup is enable
        )}
      </div>
      <div className="px-3 py-3 font-serif font-medium text-gray-700 col-span-6 bg-slate-600">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-b border-gray-300">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 border-b border-gray-300">
                  Party
                </th>
                <th scope="col" className="px-12 py-3 border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(showList) &&
                showList.map((data, index) => (
                  <tr className="bg-white dark:bg-gray-800" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.name}
                    </th>
                    <td className="px-6 py-4">{data.party}</td>

                    <td className="px-6 py-4 flex space-x-4">
                      {/* Using flexbox here */}
                      <button
                        name={data.party}
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        value={data.id}
                        title="Edit info.."
                        onClick={(e) => {
                          setShowModal(true);
                          handleId(e);
                        }}
                      >
                        <FaEdit/> {/*edit button */}
                      </button>
                      <button
                        name={data.party}
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        value={data.id}
                        title="Delete Account"
                        onClick={(e) => {
                          setDeleteElector(true);
                          handleDeleteId(e);
                        }}
                      >
                        <ImBin /> {/*delete button */}
                      </button>

                      <button
                        name={data.party}
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        value={data.id}
                        title="view Account"
                        onClick={(e) => {
                          setViewModal(true);
                          handleViewId(e);
                        }}
                      >
                        <FaStreetView/> {/*view Button */}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <ToastContainer />
        </div>
      </div>
      <div>
      {/*when i click this button then the Elector adding popup list show to a addModal component*/}
        <button
          type="submit"
          name="add"
          className="w-full py-3 px-4 mt-2 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          onClick={()=>{
            setAddModal(true);
          }}    >
          Add Elector
        </button>
      </div>
    </div>
  );
}

export default ElectorsList;
