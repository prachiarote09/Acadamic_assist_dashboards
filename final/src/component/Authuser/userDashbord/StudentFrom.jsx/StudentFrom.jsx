import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../../../../Utils";

const StudentFrom = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('user_id');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to format date from ISO to dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (!id) {
      handleError("No student ID found");
      navigate('/login');
      return;
    }
    fetchStudentData();
  }, [id, navigate]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `http://localhost:8080/student/${id}`;
      const headers = {
        headers: {
          "Authorization": localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'GET'
      };

      const response = await fetch(url, headers);

      if (response.status === 403) {
        handleError("Session expired. Please login again");
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setStudentData(result);
      handleSucess("Student data fetched successfully");
    } catch (err) {
      setError(err.message);
      handleError('Error in fetching student data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-blue-800">Loading student data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-blue-800 mb-6">Student Dashboard</h2>

      {studentData ? (
        <div className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4 bg-blue-100 p-3 rounded-t-lg">
              Personal Information
            </h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 w-1/3">Name</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.name}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Date of Birth</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{formatDate(studentData.dateOfBirth)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Religion</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.religion}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Caste</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.caste}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Mother Tongue</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.motherTongue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Details */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4 bg-blue-100 p-3 rounded-t-lg">
              Academic Details
            </h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 w-1/3">GR Number</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.grnumber}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">ABC ID</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.abcId}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Course Name</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.courseName}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Year</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.year}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4 bg-blue-100 p-3 rounded-t-lg">
              Contact Information
            </h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900 w-1/3">Address</td>
                    <td className="px-6 py-4 text-base font-semibold text-gray-700">
                      {studentData.address}, {studentData.city}, {studentData.state}, {studentData.pinCode}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Mobile No.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.mobileNo}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Email</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.email}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Parent Mobile No.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.parentMobileNo}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">Emergency Mobile No.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-gray-700">{studentData.emergencyMobileNo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">No student data found</p>
      )}
    </div>
  );
}

export default StudentFrom;
