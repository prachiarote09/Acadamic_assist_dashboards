import React, { useState, useEffect } from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import axios from "axios";

const StudentNotice = () => {
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null); // ✅ Error state

  useEffect(() => {
    axios.get("http://localhost:8080/notice/")
      .then((response) => {
        setNotices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setError("Failed to load notices. Please try again later.");
      });
  }, []);

  // ✅ Format date function
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Title Section */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
        <FaUmbrellaBeach className="text-yellow-500 text-3xl" /> Upcoming Notices
      </h1>

      {error ? ( // ✅ Show error if request fails
        <p className="text-red-600 text-center">{error}</p>
      ) : notices.length === 0 ? (
        <p className="text-gray-600 text-center">No notices available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Event Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {notices.map((notice, index) => (
                <tr key={index} className="border-b border-gray-300 hover:bg-gray-100 transition">
                  <td className="p-3 font-medium">{notice.className}</td>
                  <td className="p-3">{notice.title}</td>
                  <td className="p-3 text-blue-600 font-medium">{formatDate(notice.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentNotice;
