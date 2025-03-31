import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function Bcaexamination() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mt-6 text-blue-700">
        BCA Examination - Student Portal
      </h1>
      <div className="flex justify-center gap-8 mt-8 flex-wrap">
        <Section title="Exam Timetable" path="exam-timetable" />
        <Section title="Course Overview" path="course-overview" />
        <Section title="Previous Year Question Paper" path="previous-paper" />
        <Section title="Question Bank" path="question-bank" />
        <Section title="Result" path="percentage" />
      </div>
    </div>
  );
}

function Section({ title, path }) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/user-dashboard/examinations/bca/${path}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 w-80 text-left shadow-md transform hover:scale-105 transition-transform hover:shadow-2xl hover:border-blue-500 hover:bg-gradient-to-r from-gray-50 to-white relative group">
      <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        Access the latest {title} by clicking the button below.
      </p>
      <button
        onClick={handleViewClick}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
      >
        <FaEye />
        View
      </button>
    </div>
  );
}

export default Bcaexamination;
