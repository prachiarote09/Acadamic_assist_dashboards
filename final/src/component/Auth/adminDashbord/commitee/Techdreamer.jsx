import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleError, handleSucess } from "../../../../Utils";

const Techdreamer = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/techdreamercommittiee/", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      setStudents(response.data);
    } catch (error) {
      handleError("Error fetching Techdreamer committee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/techdreamercommittiee/", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        handleSucess("Student added to Techdreamer Committee!");
        handleReset();
        fetchStudents();
      }
    } catch (error) {
      handleError("Error saving data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/techdreamercommittiee/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        handleSucess("Student removed successfully!");
        fetchStudents();
      }
    } catch (error) {
      handleError("Error deleting student: " + error.message);
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
        <h1 className="text-center text-2xl font-bold text-purple">Techdreamer Committee</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["name", "department", "year", "grNumber"].map((field) => (
            <div key={field}>
              <label className="block text-purple font-semibold">
                {field.charAt(0).toUpperCase() + field.slice(1)}*
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
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
                  <td colSpan="5" className="p-4 text-center text-gray-500">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Techdreamer;
