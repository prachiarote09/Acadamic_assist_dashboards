import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError } from "../../../../Utils";

const SportStudent = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/sport/", {
          headers: {
            "Authorization": localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        setSports(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching sport committee data:", error);
        setError("Failed to load sport committee data. Please try again later.");
        handleError("Error loading sport committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchSportData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-blue-600">Loading...</div>
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
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 text-center">Sports Committee</h1>
        <p className="text-gray-600 text-center mt-2">
          The Sports Committee organizes inter-college tournaments, sports events, and fitness initiatives for students.
        </p>
      </div>

      {/* Student List */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Committee Members</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {sports.length > 0 ? (
                sports.map((sport) => (
                  <tr key={sport._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                    <td className="p-3">{sport.name}</td>
                    <td className="p-3">{sport.department}</td>
                    <td className="p-3">{sport.year}</td>
                    <td className="p-3">{sport.grNumber}</td>
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

export default SportStudent;
