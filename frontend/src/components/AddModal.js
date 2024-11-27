import React ,{useState,useEffect}from 'react'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError,handleSuccess } from '../utils';

function AddModal({closeModal}) {
     //submit update details
     const [addInfo, setaddInfo] = useState({
        name: "",
        age: "",
        email: "",
        contact: "",
        address: "",
        uidaiNo: "",
        password: "",
        party: "",
      });
    
      const navigate = useNavigate();

      const handleAdd = async (e) => {
        e.preventDefault(); //without reload browser
        const { name, age,email, contact, uidaiNo, address, password,party} =
          addInfo;
        if (
          !name ||
          !email ||
          !contact ||
          !uidaiNo ||
          !address ||
          !age ||
          !password ||
          !party
        ) {
          return handleError("All field are require");
        }
    
        try {
          //backend http url where user data store that are create in a node
    
          const url = "https://vote-now-api3902.vercel.app/electors";
          //const url = "http://localhost:8000/electors";
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
            "Content-Type": "application/json",
          };
    
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(addInfo),
          });
          const result = await response.json();
          console.log(result);
          const { token, message, error } = result;
          if (token) {
            handleSuccess("added Successfully");
            setTimeout(() => {
                navigate(closeModal(true))
            }, 1000);
            
          }
          if (error) {
            handleError(error);
          }
        } catch (err) {
          handleError(err);
        }
      };
    
      //this function is responsible for store a value in useState hook array when i given a input in a form
      const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(name,value);
        const copyaddInfo = { ...addInfo };
        copyaddInfo[name] = value;
        setaddInfo(copyaddInfo);
      };
    
      return (
        <>
          {/* modal-wrapper and modal-container is a css class */}
    
          <div className="min-h-screen flex-col items-center justify-center py-6 px-3 flex">
            <div className="max-w-md w-full modal-container mt-0">
              <div className="p-8 rounded-2xl bg-white shadow">
                <div className="text-right text-gray-500">
                <p className='bg-red-800'>This page is under maintanance</p>
                  <button className="font-bold" onClick={closeModal}>
                    X
                  </button>
                </div>
                <h2 className="text-gray-700 text-center text-3xl font-bold pb-6">
                  Add Candidate
                </h2>
                <form onSubmit={handleAdd}>
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
                        value={addInfo.name}
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
                        value={addInfo.age}
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
                        value={addInfo.email}
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
                        value={addInfo.contact}
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
                        value={addInfo.address}
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
                        className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                        placeholder="Enter Addhr No."
                        value={addInfo.uidaiNo}
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
                        value={addInfo.party}
                      />
                    </div>
    
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Password
                      </label>
                      <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        className="text-gray-800 bg-white border bg-gray-100 border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                        placeholder="Enter password"
                        value={addInfo.password}
                      />
                    </div>
                  </div>
    
                  <div className="!mt-12">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                    >
                      Add
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

export default AddModal