import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchStudents = async () => {
    try {
      const url = "http://localhost:8080/student";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/admin/Login");
        return;
      }
      const result = await response.json();
      setStudents(result);
    } catch (err) {
      console.log(err);
    }
  };

  const viewStudentDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/student/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }

      const studentData = await response.json();
      setSelectedStudent(studentData);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleEditStudent = (studentId) => {
    // Navigate to Student Form with ID
    navigate(`/admin-dashboard/studentform/${studentId}`);
  };

  const handleDeleteStudent = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/student/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setStudents(prev => prev.filter(student => student._id !== id));
      } else if (response.status === 403) {
        navigate("/admin/Login");
      } else {
        const error = await response.json();
        console.error("Delete failed:", error.message);
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 rounded-lg">
      {selectedStudent ? (
        <StudentDashboard
          student={selectedStudent}
          goBack={() => setSelectedStudent(null)}
        />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-2xl font-bold text-black-800">Student List</h1>
            <div className="relative w-full sm:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search students by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full mt-4 border border-black">
              <thead>
                <tr className="bg-purple-700 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">GR No.</th>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-b border-gray-300 bg-white hover:bg-gray-50"
                  >
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.grnumber}</td>
                    <td className="p-3">{student.courseName}</td>
                    <td className="p-3 space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => viewStudentDetails(student._id)}
                        className="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-3 py-1 rounded-md hover:bg-purple-600"
                      >
                        View
                      </button>
                     
                      <button
                        onClick={() => handleDeleteStudent(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No students added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const StudentDashboard = ({ student, goBack }) => {
  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-purple-800">Student Details</h2>
        <button
          onClick={goBack}
          className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors"
        >
          Back to List
        </button>
      </div>

      {[
        {
          title: "Personal Information",
          data: [
            ["Name", student.name],
            ["Date of Birth", student.dateOfBirth],
            ["Religion", student.religion],
            ["Caste", student.caste],
            ["Mother Tongue", student.motherTongue],
            ["Annual Income", student.annualIncome],
          ],
        },
        {
          title: "Academic Details",
          data: [
            ["GR Number", student.grnumber],
            ["Course Name", student.courseName],
            ["Year", student.year],
            ["ABC ID", student.abcId],
          ],
        },
        {
          title: "Contact Information",
          data: [
            [
              "Address",
              `${student.address}, ${student.city}, ${student.state}, ${student.district}, ${student.pinCode}`,
            ],
            ["Mobile No.", student.mobileNo],
            ["Email", student.email],
            ["Parent Mobile No.", student.parentMobileNo],
            ["Emergency Mobile No.", student.emergencyMobileNo],
          ],
        },
      ].map((section, i) => (
        <div key={i} className="mb-8 w-full overflow-x-auto">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4 bg-purple-100 p-3 rounded-t-lg">
            {section.title}
          </h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {section.data.map(([label, value], idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 text-base font-medium text-gray-900 w-1/3 whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-base font-semibold text-gray-700">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
