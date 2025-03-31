import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../../../../Utils";
import axios from "axios";

const Sport = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch sport committee members
  const fetchSportData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/sport/", {
        headers: {
          "Authorization": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      setSports(response.data);
    } catch (error) {
      handleError("Error fetching sport committee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSportData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/sport/", formData, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        handleSucess("Committee member added successfully!");
        handleReset();
        fetchSportData(); // Refresh the table data
      }
    } catch (error) {
      handleError("Error saving data: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/sport/${id}`, {
        headers: {
          "Authorization": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        handleSucess("Member deleted successfully!");
        fetchSportData(); // Refresh the table data
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
    <div className="max-w-5xl mx-auto p-6 bg-purple-200 shadow-lg rounded-lg">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <h1 className="text-center text-2xl font-bold text-purple">Sports Committee</h1>

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
          <button type="submit" className="bg-green-500 text-black px-6 py-2 rounded-md hover:bg-green-600">Save</button>
          <button type="button" onClick={handleReset} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Cancel</button>
        </div>
      </form>

      <hr className="my-8 border-t-2 border-gray-300" />

      <div>
        <h2 className="text-xl font-semibold text-purple-200 mt-6">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-purple-500 text-black">
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
              ) : sports.length > 0 ? (
                sports.map((sport) => (
                  <tr key={sport._id} className="border-b border-gray-300 text-black">
                    <td className="p-3 bg-transparent">{sport.name}</td>
                    <td className="p-3 bg-transparent">{sport.department}</td>
                    <td className="p-3 bg-transparent">{sport.year}</td>
                    <td className="p-3 bg-transparent">{sport.grNumber}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(sport._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
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

export default Sport;





