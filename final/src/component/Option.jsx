import React from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Option() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white p-6">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-6">Welcome!</h1>
        <p className="text-lg mb-8">Please Choose an Option Below:</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center gap-3 w-full px-6 py-4 bg-green-500 hover:bg-green-600 rounded-xl shadow-md text-xl transition-transform transform hover:scale-105 border-2 border-green-400"
          >
            <FaUserTie size={30} className="text-yellow-300" /> Login as Admin
          </button>

          <button
            onClick={() => navigate("/user/login")}
            className="flex items-center gap-3 w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-md text-xl transition-transform transform hover:scale-105 border-2 border-blue-400"
          >
            <FaUsers size={30} className="text-yellow-300" /> Login as User
          </button>
        </div>
      </div>
    </div>
  );
}
