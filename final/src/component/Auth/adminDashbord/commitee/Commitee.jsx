import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Committee() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [committees, setCommittees] = useState([]);
  const [newCommittee, setNewCommittee] = useState("");

  useEffect(() => {
    const defaultCommittees = [
      { title: "Cultural Committee", path: "/admin-dashboard/committees/cultural" },
      { title: "Sports Committee", path: "/admin-dashboard/committees/sports" },
      { title: "Student Committee", path: "/admin-dashboard/committees/student" },
      { title: "Tech Dreamers", path: "/admin-dashboard/committees/tech-dreamers" },
      { title: "Anti-Ragging", path: "/admin-dashboard/committees/anti-ragging" },
    ];

    const savedCommittees = JSON.parse(localStorage.getItem("committees")) || [];

    const mergedCommittees = [
      ...defaultCommittees,
      ...savedCommittees.filter((c) => !defaultCommittees.some((dc) => dc.path === c.path)),
    ];

    setCommittees(mergedCommittees);
    localStorage.setItem("committees", JSON.stringify(mergedCommittees));
  }, []);

  const saveCommittees = (updatedCommittees) => {
    setCommittees(updatedCommittees);
    localStorage.setItem("committees", JSON.stringify(updatedCommittees));
  };

  const handleCreateCommittee = () => {
    if (newCommittee.trim() === "") return;
    const formattedPath = `/admin-dashboard/committees/${newCommittee.toLowerCase().replace(/\s+/g, "-")}`;
    const updatedCommittees = [...committees, { title: newCommittee, path: formattedPath }];
    saveCommittees(updatedCommittees);
    setNewCommittee("");
  };

  const handleDeleteCommittee = (index) => {
    const updatedCommittees = committees.filter((_, i) => i !== index);
    saveCommittees(updatedCommittees);
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <nav className="flex items-center justify-between bg-purple-700 text-white p-4 rounded-lg">
        <div className="text-lg font-bold">Committee Members</div>
        <button className="text-white text-2xl md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {/* Create Committee Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
        <input
          type="text"
          value={newCommittee}
          onChange={(e) => setNewCommittee(e.target.value)}
          placeholder="Enter committee name"
          className="border px-4 py-2 rounded-md w-64"
        />
        <button
          onClick={handleCreateCommittee}
          className="w-40 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-2 rounded-md hover:scale-105 transition-transform hover:shadow-lg"
        >
          Create
        </button>
      </div>

      {/* Committee Sections */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {committees.map((committee, index) => (
          <Section key={index} title={committee.title} path={committee.path} onDelete={() => handleDeleteCommittee(index)} />
        ))}
      </div>
    </div>
  );
}

function Section({ title, path, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-purple-100 border border-gray-200 rounded-xl p-6 w-80 text-left shadow-md transform hover:scale-105 transition-transform hover:shadow-2xl hover:border-purple-500 relative group">
      <h3 className="text-xl font-semibold text-purple-700 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Learn more about {title.toLowerCase()} by clicking the button below.
      </p>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => navigate(path)}
          className="w-32 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
        >
          <FaEye />
          View
        </button>
        <button
          onClick={onDelete}
          className="w-32 bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-lg hover:scale-105 hover:shadow-lg transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Committee;
