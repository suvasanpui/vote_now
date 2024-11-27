import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import Nav from "./../components/Navbar";
import ElectorsList from "../components/ElectorsList";

function Home() {
  const [allresult, setAllresult] = useState("");
  const [isvote,setIsVote]=useState(null);

  //fetch all the member record
  const fetchRecord = async () => {
    try {
      const url = "https://vote-now-api3902.vercel.app/user/profile";
      //const url = "http://localhost:8000/user/profile";
      //this is function to gat a token from localstorage
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("loggedToken")}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const result = await response.json();
      console.log(result);
      setAllresult(result.user);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchRecord();
    const id=setInterval(fetchRecord,3000); //fetch record in every 3 seconsd
    setIsVote(id);
    return ()=>clearInterval(id)
  }, []);

  return (
    <>
      <Nav />
      <div
        className="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('background3.jpg')",
          backgroundSize: "cover", // Ensures the image covers the container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repeating the image
        }}
      >
        <div className="m-20 font-bold text-red-600">
          {!allresult.isVoted ? (
            <ElectorsList />
          ) : (
            "you are already given a vote"
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
