import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const StudentEvent = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // ✅ State to track errors

  useEffect(() => {
    axios.get("http://localhost:8080/event/")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      });
  }, []);

  // ✅ Function to format date
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
        <FaCalendarAlt className="text-blue-500" /> Upcoming Events
      </h1>

      {error ? ( // ✅ Show error message if request fails
        <p className="text-red-600 text-center">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-gray-600 text-center">No events available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Event Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{event.name}</td>
                  <td className="p-3">{event.description}</td>
                  <td className="p-3 font-medium text-blue-600">
                    {formatDate(event.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentEvent;
