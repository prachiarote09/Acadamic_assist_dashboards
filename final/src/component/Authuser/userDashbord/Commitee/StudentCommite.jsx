import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTheaterMasks,
  FaFootballBall,
  FaUserFriends,
  FaCode,
  FaShieldAlt,
  FaEye,
} from "react-icons/fa";

function StudentCommite() {
  const [committees, setCommittees] = useState([]);

  useEffect(() => {
    const defaultCommittees = [
      { title: "Cultural Committee", path: "/user-dashboard/committeess/cultural" },
      { title: "Sports Committee", path: "/user-dashboard/committeess/sports" },
      { title: "Student Committee", path: "/user-dashboard/committeess/student" },
      { title: "Tech Dreamers", path: "/user-dashboard/committeess/tech-dreamers" },
      { title: "Anti-Ragging", path: "/user-dashboard/committeess/anti-ragging" },
    ];

    const savedCommittees = JSON.parse(localStorage.getItem("committees")) || [];

    const updatedCommittees = [
      ...defaultCommittees,
      ...savedCommittees
        .filter((c) => c.name && typeof c.name === "string")
        .map((c) => ({
          title: c.name,
          path: `/user-dashboard/committeess/${c.name.replace(/\s+/g, "-").toLowerCase()}`,
        })),
    ];

    setCommittees(updatedCommittees);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mt-6 text-blue-700">
        Student Committees
      </h1>
      <div className="flex justify-center gap-8 mt-8 flex-wrap">
        {committees.map((committee, index) => (
          <Section key={index} title={committee.title} path={committee.path} />
        ))}
      </div>
    </div>
  );
}

const getIcon = (title) => {
  const iconClass = "text-blue-600 text-3xl mb-3";
  switch (title) {
    case "Cultural Committee":
      return <FaTheaterMasks className={iconClass} />;
    case "Sports Committee":
      return <FaFootballBall className={iconClass} />;
    case "Student Committee":
      return <FaUserFriends className={iconClass} />;
    case "Tech Dreamers":
      return <FaCode className={iconClass} />;
    case "Anti-Ragging":
      return <FaShieldAlt className={iconClass} />;
    default:
      return <FaEye className={iconClass} />;
  }
};

function Section({ title, path }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 w-80 text-left shadow-md transform hover:scale-105 transition-transform hover:shadow-2xl hover:border-blue-500 hover:bg-gradient-to-r from-gray-50 to-white relative group">
      <div className="flex items-center gap-3 mb-3">
        {getIcon(title)}
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        Explore the {title} and get involved with various activities and initiatives.
      </p>
      <button
        onClick={() => navigate(path)}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
      >
        <FaEye />
        View
      </button>
    </div>
  );
}

export default StudentCommite;