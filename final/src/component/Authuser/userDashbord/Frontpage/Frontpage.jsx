import React from "react";
import {
  FaCalendarAlt,
  FaFilePdf,
  FaBullhorn,
  FaBook,
  FaClipboardList,
  FaUserGraduate,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function Frontpage() {

  const navigate=useNavigate()

  const goToAdminPanel = () => {
    navigate("/admin/Login"); // ✅ Redirect to /admin
  };
  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center relative">
      {/* Admin Button at Top-Left */}
      <div className="absolute top-4 left-4">
        <button onClick={goToAdminPanel} className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
          <RiAdminFill size={20} />
          <span className="font-semibold">Admin Panel</span>
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-blue-800 mb-10 tracking-wide shadow-sm">
        🎓 Student Dashboard
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {cards.map((card, index) => (
          <Card
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}

// Define card data
const cards = [
  {
    icon: <FaClipboardList />,
    title: "Notices",
    description: "Stay updated with the latest college announcements.",
  },
  {
    icon: <FaBullhorn />,
    title: "Upcoming Events",
    description: "Stay updated with the latest college events.",
  },
  {
    icon: <FaFilePdf />,
    title: "Exam PDFs",
    description:
      "Download exam schedules, question banks, and previous year papers.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Holiday List",
    description: "Check the holiday schedule for the academic year.",
  },
  {
    icon: <FaBook />,
    title: "Study Materials",
    description: "Access course materials, syllabus, and resources.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Results",
    description: "View your academic performance and grades.",
  },
  {
    icon: <FaUserGraduate />,
    title: "Personal Details",
    description: "Check and update your personal information.",
  },
  {
    icon: <FaUsers />,
    title: "Committee Information",
    description: "Know about student committees and their activities.",
  },
];

// Card Component
function Card({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-center hover:scale-105 transition-transform duration-300 relative border border-gray-200 hover:border-blue-500 group hover:shadow-2xl transform hover:translate-y-1 hover:bg-gradient-to-br from-blue-50 to-white">
      {/* Icon */}
      <div className="text-5xl mb-4 text-blue-500 group-hover:text-blue-700 transition-all">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-700 group-hover:text-blue-800 mb-2 transition-all">
        {title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

      {/* Button */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-xl transition-all">
        Explore
      </button>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
    </div>
  );
}

export default Frontpage;
