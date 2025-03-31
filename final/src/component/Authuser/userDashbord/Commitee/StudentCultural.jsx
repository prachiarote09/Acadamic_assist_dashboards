import React, { useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineSchool } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import { handleError } from "../../../../Utils";

const StudentCultural = () => {
  const [culturals, setCulturals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCulturalData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/cultural/", {
          headers: {
            "Authorization": localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        });
        setCulturals(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching cultural committee data:", error);
        setError("Failed to load cultural committee data. Please try again later.");
        handleError("Error loading cultural committee data");
      } finally {
        setLoading(false);
      }
    };

    fetchCulturalData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-purple-600">Loading...</div>
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
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full text-center relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-purple-700 tracking-wide flex justify-center items-center gap-2">
          <MdOutlineSchool className="text-purple-500" /> Cultural Committee
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          The Cultural Committee is responsible for organizing cultural events, fests, and competitions in the college.
        </p>
        <div className="absolute -top-5 -left-5 w-24 h-24 bg-purple-300 opacity-30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-200 opacity-50 rounded-full blur-3xl"></div>
      </div>

      {/* Committee Members Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUserGraduate className="text-purple-500" /> Committee Members
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-4 text-left flex items-center gap-2">
                  <BsFillPersonFill className="text-white" /> Name
                </th>
                <th className="p-4 text-left text-purple-200">Department</th>
                <th className="p-4 text-left text-purple-200">Year</th>
                <th className="p-4 text-left text-purple-200">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {culturals.length > 0 ? (
                culturals.map((cultural) => (
                  <tr key={cultural._id} className="border-b border-gray-300 hover:bg-purple-100 transition">
                    <td className="p-4 font-medium">{cultural.name}</td>
                    <td className="p-4">{cultural.department}</td>
                    <td className="p-4">{cultural.year}</td>
                    <td className="p-4">{cultural.grNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
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

export default StudentCultural;
