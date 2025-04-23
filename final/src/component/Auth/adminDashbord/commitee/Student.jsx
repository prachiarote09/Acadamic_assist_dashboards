import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleError, handleSucess } from "../../../../Utils";

const Student = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/studentcommittee/", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setStudents(response.data);
    } catch (error) {
      handleError("Error fetching student committee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/studentcommittee/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        handleSucess("Student committee member added successfully!");
        handleReset();
        fetchStudentData();
      }
    } catch (error) {
      handleError("Error saving data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/studentcommittee/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        handleSucess("Member deleted successfully!");
        fetchStudentData();
      }
    } catch (error) {
      handleError("Error deleting member: " + error.message);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      department: "",
      year: "",
      grNumber: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-purple-100 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <h1 className="text-center text-2xl font-bold text-purple">Student Committee</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", name: "name" },
            { label: "Department", name: "department" },
            { label: "Year", name: "year" },
            { label: "GR Number", name: "grNumber" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-purple font-semibold">{label}*</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                required
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Save
          </button>
          <button type="button" onClick={handleReset} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
            Cancel
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-purple mb-4">Committee Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-purple-600">Loading...</td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id} className="border-b border-gray-200 hover:bg-purple-50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.department}</td>
                    <td className="p-3">{student.year}</td>
                    <td className="p-3">{student.grNumber}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
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

export default Student;
