import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError } from "../../../../Utils";

const StudentRagging = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaggingData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/ragging/", {
          headers: {
            "Authorization": localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        setMembers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching ragging committee data:", error);
        setError("Failed to load ragging committee data. Please try again later.");
        handleError("Error loading ragging committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchRaggingData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-red-600 text-center">Anti-Ragging Committee</h1>
        <p className="text-gray-600 text-center mt-2">
          This committee ensures a safe and respectful campus environment for all students.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Committee Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="p-3">{member.name}</td>
                    <td className="p-3">{member.department}</td>
                    <td className="p-3">{member.year}</td>
                    <td className="p-3">{member.grNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 text-gray-500">
                    No committee members available.
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

export default StudentRagging;
