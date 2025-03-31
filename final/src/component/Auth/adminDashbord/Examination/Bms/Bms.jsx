import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

function Bms() {
  const navigate = useNavigate();

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center mt-6 text-purple-700">
        Welcome to BMS Examination
      </h1>

      {/* Sections with Tables */}
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <Section title="Exam Timetable" path="exam-timetable" navigate={navigate} />
        <Section title="Result" path="percentage" navigate={navigate} />
        <Section title="Previous Year Question Paper" path="previousyear" navigate={navigate} />
        <Section title="Question Bank" path="questionbank" navigate={navigate} />
        <Section title="Course Overview" path="bmscourse" navigate={navigate} />
      </div>
    </div>
  );
}

function Section({ title, path, navigate }) {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-purple-200 border border-purple-300 rounded-xl p-6 w-80 text-left shadow-md transform hover:scale-105 transition-transform hover:shadow-2xl hover:border-purple-500 hover:bg-gradient-to-r  relative group">
      <h3 className="text-xl font-semibold text-purple-700 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Manage {title.toLowerCase()} details efficiently.
      </p>
      <button
        className="w-32 bg-gradient-to-r from-purple-700 to-purple-900 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transition-all"
        onClick={() => navigate(`/admin-dashboard/examination/bms/${path}`)}
      >
        <FaEye />
        View
      </button>
    </div>
  );
}

export default Bms;
