import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [error, setError] = useState(null); // ✅ Added error state

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedback/")
      .then((response) => {
        setFeedbackList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to load feedbacks. Please try again later.");
      });
  }, [feedbackList]); // ✅ Added dependency for real-time updates

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-400 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 text-center">
          📚 All Submitted Feedbacks
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* ✅ Display error if fetch fails */}

        {feedbackList.length === 0 ? (
          <p className="text-gray-600 text-center">No feedback submitted yet. 🚫</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {feedbackList.map((feedback, index) => (
              <div
                key={index}
                className="p-5 border-l-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-bold mb-2">
                  {feedback.firstName} {feedback.lastName}
                </h3>
                <p className="text-sm">
                  <strong>📚 Class:</strong> {feedback.className} {/* ✅ Fixed incorrect class key */}
                </p>
                <p className="text-sm">
                  <strong>📧 Email:</strong> {feedback.email}
                </p>
                {feedback.feedbackType && ( // ✅ Only show if feedbackType exists
                  <p className="text-sm">
                    <strong>💬 Type:</strong> <span className="capitalize">{feedback.feedbackType}</span>
                  </p>
                )}
                <p className="mt-3 text-sm italic break-words">"{feedback.feedback}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
