import React from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FaHome, FaUserGraduate, FaBook, FaCalendarAlt, 
  FaClipboardList, FaUsers, FaEnvelope 
} from "react-icons/fa";
  
function Page() {
const navigate = useNavigate();
  const handlAdminClick=()=>{
    navigate ("/user-dashboard")
    alert("moving you to student dashboard")
    }

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      
      <div className="bg-white p-3 sm:p-4 shadow-md rounded-lg flex items-center gap-3 sm:gap-4  justify-between">
        
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 justify-between flex"><FaHome className="text-pink-500 text-xl sm:text-2xl" />Admin Dashboard</h1>
        <button className="bg-pink-300 p-1.5 rounded-lg" onClick={handlAdminClick}>Student Dashboard</button>
      </div>

      {/* Content Section */}
      <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage students, courses, events, examinations, and committees. Use the left sidebar to navigate.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
          <Card title="Students" icon={<FaUserGraduate />} bgColor="bg-blue-100" />
          <Card title="Courses" icon={<FaBook />} bgColor="bg-green-100" />
          <Card title="Events" icon={<FaCalendarAlt />} bgColor="bg-yellow-100" />
          <Card title="Examinations" icon={<FaClipboardList />} bgColor="bg-red-100" />
          <Card title="Committees" icon={<FaUsers />} bgColor="bg-purple-100" />
          <Card title="Notice" icon={<FaEnvelope />} bgColor="bg-indigo-100" />
        </div>
      </div>

      {/* Activities Section */}
      <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Activities You Can Do</h2>
        <ul className="text-gray-600 text-sm sm:text-base">
          <li className="mb-2">✔ Add New Student Details</li>
          <li className="mb-2">📢 Upcoming event: Annual Sports Meet</li>
          <li className="mb-2">📄 Examination timetable updated</li>
          <li>📝 Committee meeting and about members</li>
        </ul>
      </div>
    </div>
  );
}

// Card Component
function Card({ title, icon, bgColor }) {
  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-md text-center ${bgColor}`}>
      <div className="text-2xl sm:text-3xl text-gray-700 mb-2">{icon}</div>
      <h3 className="text-gray-800 font-semibold text-sm sm:text-base">{title}</h3>
    </div>
  );
}

export default Page;
