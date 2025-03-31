import React, { useState, useEffect } from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const StudentCouncil = () => {
  const [members, setMembers] = useState([]);

  // ✅ Load members from localStorage when the component mounts
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("studentCommittee")) || [];
    setMembers(savedStudents);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-green-700 tracking-wide flex justify-center items-center gap-2">
          <MdGroups className="text-green-500" /> Student Council
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          This committee represents student interests and organizes student activities.
        </p>
        <div className="absolute -top-5 -left-5 w-24 h-24 bg-green-300 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-green-200 opacity-50 rounded-full blur-3xl"></div>
      </div>

      {/* Committee Members Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUsers className="text-green-500" /> Committee Members
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="p-4 text-left flex items-center gap-2">
                  <FaUserTie className="text-white" /> Name
                </th>
                <th className="p-4 text-left text-green-200">Department</th>
                <th className="p-4 text-left text-green-200">Year</th>
                <th className="p-4 text-left text-green-200">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={index} className="border-b border-gray-300 hover:bg-green-100 transition">
                    <td className="p-4 font-medium">{member.name}</td>
                    <td className="p-4">{member.department}</td>
                    <td className="p-4">{member.year}</td>
                    <td className="p-4">{member.grNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No student data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentCouncil;
