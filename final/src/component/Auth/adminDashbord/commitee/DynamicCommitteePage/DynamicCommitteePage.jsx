import React, { useState } from "react";
import { useParams } from "react-router-dom";

const committeeDetails = {
  cultural: {
    title: "Cultural Committee",
    description: "The Cultural Committee organizes and promotes cultural events in the college.",
    theme: "bg-blue-200",
  },
  sports: {
    title: "Sports Committee",
    description: "The Sports Committee encourages students to participate in various sports activities.",
    theme: "bg-green-200",
  },
  student: {
    title: "Student Committee",
    description: "The Student Committee represents student interests and plans student-oriented activities.",
    theme: "bg-yellow-200",
  },
  "tech-dreamers": {
    title: "Tech Dreamers",
    description: "Tech Dreamers Committee fosters technology-related activities and innovation.",
    theme: "bg-purple-200",
  },
  "anti-ragging": {
    title: "Anti-Ragging Committee",
    description: "The Anti-Ragging Committee ensures a safe and respectful environment for students.",
    theme: "bg-red-200",
  },
};

const DynamicCommitteePage = () => {
  const { committeeName } = useParams();
  const committee = committeeDetails[committeeName] || {
    title: committeeName.replace(/-/g, " "),
    description: "Details will be added soon.",
    theme: "bg-gray-200",
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });

  const [students, setStudents] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents([...students, formData]);
    alert("Student added successfully!");
    setFormData({ name: "", department: "", year: "", grNumber: "" });
  };

  return (
    <div className={`min-h-screen p-6 ${committee.theme} flex flex-col items-center`}>
      <h1 className="text-3xl font-bold text-gray-800">{committee.title}</h1>
      <p className="mt-2 text-gray-600">{committee.description}</p>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Add Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "department", "year", "grNumber"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700">{field.replace(/([A-Z])/g, " $1")}*</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">Save</button>
        </div>
      </form>

      {students.length > 0 && (
        <div className="mt-8 w-full max-w-3xl overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-700">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full mt-4 border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white text-sm md:text-base">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300 text-gray-800 text-sm md:text-base">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.year}</td>
                  <td className="p-3">{student.grNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default DynamicCommitteePage;
