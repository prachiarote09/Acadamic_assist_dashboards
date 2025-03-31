import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUppage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    studentID: "",
    course: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sign Up Successful! Redirecting to User Login page...");
    navigate("/user");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[45vh]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <input
            type="text"
            name="studentID"
            placeholder="Student ID"
            value={formData.studentID}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course (e.g., BCA, BMS)"
            value={formData.course}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-violet-600 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? {" "}
          <Link to="/user" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUppage;