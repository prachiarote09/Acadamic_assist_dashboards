import React, { useState } from "react";
import { handleError } from "../../../../Utils";
import { useNavigate } from "react-router-dom";

function Studentfom() {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  //Religion
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [motherTongue, setMotherTongue] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  //Academin Details
  const [grnumber, setGrnumber] = useState("");
  const [abcId, setAbcId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [year, setYear] = useState("");
  //Address Details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pinCode, setPinCode] = useState("");
  //Contact Details
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [parentMobileNo,setParentMobileNumber]=useState("");
  const [emergencyMobileNo,setEmergencyMobileNo]=useState("");


  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      console.error("User ID not found");
      return;
    } else {
      console.log("id found", user_id);
    }

    const newData = {
      name,
      dateOfBirth,
      religion,
      caste,
      motherTongue,
      annualIncome,
      grnumber,
      abcId,
      courseName,
      year,
      address,
      city,
      state,
      district,
      pinCode,
      mobileNo,
      email,
      parentMobileNo,
      emergencyMobileNo,
      user: user_id,
    };

    try {
      const url = `http://localhost:8080/student`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("Data added:", result.data);

      // Clear form inputs
      setName("");
      setDateOfBirth("");
      setReligion("");
      setCaste("");
      setMotherTongue("");
      setAnnualIncome("");
      setGrnumber("");
      setAbcId("");
      setCourseName("");
      setYear("");
      setAddress("");
      setCity("");
      setState("");
      setDistrict("");
      setPinCode("");
      setMobileNo("");
      setEmail("");
      setParentMobileNumber("");
      setEmergencyMobileNo("");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg rounded-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin-dashboard/studentlist")}
          className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          View Students
        </button>
      </div>
      <form onSubmit={addData} className="space-y-6">
        <h1 className="text-center text-2xl font-bold text-white">Add Student</h1>

        {/* Personal Details */}
        <h3 className="text-lg font-semibold text-white">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold">Full Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold">Date of Birth*</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Religion, Caste, Mother Tongue, Annual Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold">Religion</label>
            <input
              type="text"
              value={religion}
              onChange={(e) => setReligion(e.target.value)}
              placeholder="Enter Religion"
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold">Caste</label>
            <input
              type="text"
              value={caste}
              onChange={(e) => setCaste(e.target.value)}
              placeholder="Enter Caste"
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold">Mother Tongue</label>
            <input
              type="text"
              value={motherTongue}
              onChange={(e) => setMotherTongue(e.target.value)}
              placeholder="Enter Mother Tongue"
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white font-semibold">Annual Income</label>
            <input
              type="text"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(e.target.value)}
              placeholder="Enter Annual Income"
              className="w-full p-2 border border-gray-300 bg-white rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Acadamic Details */}
        <h3 className="text-lg font-semibold text-white">Acadamic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-semibold">GR Number</label>
              <input
                type="text"
                name="grnumber"
                value={grnumber}
                onChange={(e) => setGrnumber(e.target.value)}
                placeholder={`Enter GR Number`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-white font-semibold">ABC ID</label>
              <input
                type="text"
                name="abcId"
                value={abcId}
                onChange={(e) => setAbcId(e.target.value)}
                placeholder={`Enter ABC ID`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-white font-semibold">Couse Name</label>
              <input
                type="text"
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder={`Enter Course Name`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-white font-semibold">Year</label>
              <input
                type="text"
                name="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={`Enter Year`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
        </div>

        {/* Address Details */}
        <h3 className="text-lg font-semibold text-white">Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div >
              <label className="block text-white font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={`Enter Address`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">City</label>
              <input
                type="text"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={`Enter City`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">State</label>
              <input
                type="text"
                name="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={`Enter State`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">District</label>
              <input
                type="text"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={`Enter District`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">Pin Code</label>
              <input
                type="text"
                name="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder={`Enter Pin Code`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
     
        </div>

        {/* Contact Details */}
        <h3 className="text-lg font-semibold text-white">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div >
              <label className="block text-white font-semibold">Mobile No.</label>
              <input
                type="text"
                name="mobileNo"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                placeholder={`Enter Mobile No.`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">Email Id</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter Email Id`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">Parent/Guardian Mobile No.</label>
              <input
                type="text"
                name="parentMobileNo"
                value={parentMobileNo}
                onChange={(e) => setParentMobileNumber(e.target.value)}
                placeholder={`Enter Parent/Guardian Mobile No.`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div >
              <label className="block text-white font-semibold">Emergency Mobile No.</label>
              <input
                type="text"
                name="emergencyMobileNo"
                value={emergencyMobileNo}
                onChange={(e) => setEmergencyMobileNo(e.target.value)}
                placeholder={`Enter Emergency Mobile No.`}
                className="w-full p-2 border bg-white border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
        </div>

        <div className="flex justify-center gap-4">
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Studentfom;
