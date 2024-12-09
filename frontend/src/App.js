import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import AdminHome from "./pages/AdminHome";
import Dummy from "./components/UpdateModal";

function App() {
  const [isAuthenticate, setIsauthenticate] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticate ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <ToastContainer/>
      <RefreshHandler setIsauthenticate={setIsauthenticate} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/profile/change-password" element={<ChangePassword/>}/>
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/admin-profile" element={<PrivateRoute element={<AdminHome />} />} />
      </Routes>
    </div>
  );
}

export default App;
