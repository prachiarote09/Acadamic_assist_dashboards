import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Option from "./component/Option";
import AdminLogin from "./component/Auth/AdminLogin";
import Dashbord from "./component/Auth/adminDashbord/Dashbord";
import Userlogin from "./component/Authuser/Userlogin";
import SignUppage from "./component/Authuser/SignUppage";
import UserDashboard from "./component/Authuser/userDashbord/UserDashboard";
import AdminSignUpPage from "./component/Auth/AdminSignUpPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Option />} />
        <Route path="/admin/Login" element={<AdminLogin />} />
        <Route path="/user/login" element={<Userlogin />} />
        <Route path="/admin-dashboard/*" element={<Dashbord />} />
        <Route path='/user-dashboard/*' element={<UserDashboard/>}/>
        <Route path='admin/signup' element={<AdminSignUpPage/>}/>
        <Route path='user/signup' element={<SignUppage/>}/>
        
      </Routes>
    </Router>
  );
}

