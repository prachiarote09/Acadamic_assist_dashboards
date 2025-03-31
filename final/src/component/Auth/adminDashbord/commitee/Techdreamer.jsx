import React, { useState } from "react";

const Techdreamer = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    grNumber: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents((prev) => [...prev, formData]);
    console.log("Form Data:", formData);
    alert("Student data saved successfully!");
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      name: "",
      department: "",
      year: "",
      grNumber: "",
    });
  };

  const handleEdit = (index) => {
    const studentToEdit = students[index];
    setFormData(studentToEdit);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-purple-200 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">Save</button>
          <button type="button" onClick={handleReset} className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Cancel</button>
        </div>
      </form>

      <hr className="my-8 border-t-2 border-gray-300" />

      <div>
        <h2 className="text-xl font-semibold text-purple -200 mt-6">Student List</h2>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse min-w-[300px]">
            <thead>
              <tr className="bg-purple-500 text-white">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">GR Number</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300 text-white">
                  <td className="p-3 bg-transparent">{student.name}</td>
                  <td className="p-3 bg-transparent">{student.department}</td>
                  <td className="p-3 bg-transparent">{student.year}</td>
                  <td className="p-3 bg-transparent">{student.grNumber}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Techdreamer
