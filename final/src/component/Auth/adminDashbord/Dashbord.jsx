import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Notice from "./Notice/Notice";
import Event from "./event/Event";
import Commitee from "./commitee/Commitee";
import Page from "./Commonpagge.jsx/Page";
import Studentfom from "./StudentFrom/Studentfom";
import Examination from "./Examination/Examination";
import Chatbot from "./Chatboat/Chatbot";
import { IoMenu, IoClose } from "react-icons/io5";
import Cultural from "./commitee/Cultural";
import Sport from "./commitee/Sport";
import Student from "./commitee/Student";
import Techdreamer from "./commitee/Techdreamer";
import Ragging from "./commitee/Ragging";
import Adminfeedback from "./feedback/Adminfeedback";
import StudentList from "./StudentFrom/StudentList";
import DynamicCommitteePage from "./commitee/DynamicCommitteePage/DynamicCommitteePage";
import { handleSucess } from "../../../Utils";

function Dashbord() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 763);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 763);

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
      navigate('/admin/login');
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
          className={`bg-gray-800 text-white w-1/4 p-5 h-screen transition-all duration-300 
            ${isSmallScreen ? "absolute left-0 top-0 w-3/4 z-50 shadow-lg" : ""}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Admin Dashboard Welcome {loggedInUser}</h1>
            {isSmallScreen && (
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white p-2 rounded-md hover:bg-gray-700"
              >
                <IoClose size={24} />
              </button>
            )}
          </div>
          
          <ul className="space-y-4"> {/* Increased gap between items */}
  <li>
    <Link
      to="/admin-dashboard"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Dashboard
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/studentform"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Student Details
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/examination"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Examination
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/events"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Events
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/committees"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Committees
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/notices"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Notice
    </Link>
  </li>
  <li>
    <Link
      to="/admin-dashboard/feedback"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      Feedback
    </Link>
  </li>
  {/* <li>
    <Link
      to="/admin-dashboard/chatboat"
      className="block px-3 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:text-yellow-300"
    >
      ChatBoat
    </Link>
  </li> */}
</ul>
<button className=" p-6 transition-all duration-300" onClick={handleLogOut}>LogOut</button>
        </div>
      )}

      {/* Toggle Button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white bg-gray-800 p-3 rounded-md hover:bg-gray-700 fixed top-5 left-5 z-10"
        >
          <IoMenu size={24} />
        </button>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-grow h-screen overflow-y-auto bg-white p-6 transition-all duration-300 
          ${isSidebarOpen && !isSmallScreen ? "ml-1/4" : ""}`}
      >
        <Routes>
          <Route path="" element={<Page />} />
          <Route path="notices" element={<Notice />} />
          <Route path="events" element={<Event />} />
        
          <Route path="committees" element={<Commitee />} />
          <Route path="studentform" element={<Studentfom />} />
          <Route path="studentform/:id" element={<Studentfom />} />
          <Route path="studentlist"element={<StudentList/>}/>
          <Route path="examination/*" element={<Examination />} />
          <Route path="feedback" element={<Adminfeedback/>}/>
          <Route path="chatboat" element={<Chatbot />} />
          <Route path="committees/:committeeName" element={<DynamicCommitteePage />} />
           {/* Sub-routes for committees */}
           <Route path="committees/cultural" element={<Cultural />} />
                  <Route path="committees/sports" element={<Sport/>} />
                  <Route path="committees/student" element={<Student />} />
                  <Route path="committees/tech-dreamers" element={<Techdreamer />} />
                  <Route path="committees/anti-ragging" element={<Ragging/>} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashbord;
