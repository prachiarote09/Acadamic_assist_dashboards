import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

import { IoMenu, IoClose } from "react-icons/io5";
import StudentFrom from "./StudentFrom.jsx/StudentFrom";
import StudentExamination from "./Examination.jsx/StudentExamination";
import StudentCommite from "./Commitee/StudentCommite";
import StudentEvent from "./Event.jsx/StudentEvent";

import StudentNotice from "./Notice/StudentNotice";
import StudentCultural from "./Commitee/StudentCultural";

import Studenttectdreamer from "./Commitee/Studenttectdreamer";
import StudentCouncil from "./Commitee/StudentCouncil";
import StudentRagging from "./Commitee/StudentRagging";
import SportStudent from "./Commitee/SportStudent";
import Frontpage from "./Frontpage/Frontpage";
import Studentfeedback from "./feedback/Studentfeedback";
import { handleSucess } from "../../../Utils";

function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 763);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 763);
  const location = useLocation();

  //changes by gaurang
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
  //Log out functionality
  const handleLogOut=(e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSucess('User LoggedOut');
    setTimeout(()=>{
      navigate('/option');
      
    },1000)
  }

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsSidebarOpen(screenWidth > 763);
      setIsSmallScreen(screenWidth <= 763);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className={`bg-blue-900 text-white w-1/4 p-5 h-screen transition-all duration-300 
            ${isSmallScreen ? "absolute left-0 top-0 w-3/4 z-50 shadow-lg" : ""}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Student Dashboard Welcome {loggedInUser}</h1>
            {isSmallScreen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white p-2 rounded-md hover:bg-blue-700"
              >
                <IoClose size={24} />
              </button>
            )}
          </div>

          

          {/* Sidebar Menu */}
          <ul className="space-y-4 text-lg font-semibold">
            {[
              { path: "/user-dashboard/frontpage", label: "Student Dashboard" },
              { path: "/user-dashboard/students", label: "Personal Information" },
              { path: "/user-dashboard/examinations", label: "Examination" },
              { path: "/user-dashboard/committeess", label: "Committees" },
              { path: "/user-dashboard/eventss", label: "Events" },
             
              { path: "/user-dashboard/noticess", label: "Notices" },
              { path: "/user-dashboard/studentfeedback", label: "Feddback" },

            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block p-3 rounded-md transition-all duration-300 
                    ${location.pathname === item.path 
                      ? "bg-white text-blue-900 font-bold shadow-md" 
                      : "hover:bg-blue-700"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className=" p-6 transition-all duration-300" onClick={handleLogOut}>LogOut</button>
        </div>
      )}

      {/* Sidebar Toggle Button for Small Screens */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white bg-blue-900 p-3 rounded-md hover:bg-blue-700 fixed top-5 left-5 z-10"
        >
          <IoMenu size={24} />
        </button>
      )}

      {/* Right Page Content (Fix for Scrollbar) */}
      <div
        className={`flex-grow h-screen overflow-y-auto overflow-x-hidden bg-white p-6 transition-all duration-300 
          ${isSidebarOpen && !isSmallScreen ? "ml-1/4" : ""}`}
      >
        <Routes>
          <Route index element={<Frontpage />} />
          <Route path="frontpage" element={<Frontpage/>}/>
          <Route path="students" element={<StudentFrom />} />
          <Route path="examinations/*" element={<StudentExamination />} />
          <Route path="committeess" element={<StudentCommite />} />
          <Route path="eventss" element={<StudentEvent />} />
          <Route path="studentfeedback" element={< Studentfeedback/>} />
          <Route path="noticess" element={<StudentNotice />} />

          {/* commitee */}
          
           <Route path="committeess/cultural" element={<StudentCultural />} />
           <Route path="committeess/sports" element={<SportStudent />} />
           <Route path="committeess/student" element={< StudentCouncil/>} />
           <Route path="committeess/tech-dreamers" element={<Studenttectdreamer />} />
           <Route path="committeess/anti-ragging" element={<StudentRagging />} />
        </Routes>
      </div>
    </div>
  );
}

export default UserDashboard;
