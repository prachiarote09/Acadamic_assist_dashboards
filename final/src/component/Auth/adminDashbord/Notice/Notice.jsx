import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({ className: "", title: "", date: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://localhost:8080/notice/");
        if (!response.ok) throw new Error("Failed to fetch notice");
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notice:", error);
      }
    };
    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addNotice = async (e) => {
    e.preventDefault();
    const newData = { className: formData.className.trim(), title: formData.title.trim(), date: formData.date };
    try {
      const response = await fetch("http://localhost:8080/notice/", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to add notice");
      setNotices((prev) => [...prev, result.data]);
      setFormData({ className: "", title: "", date: "" });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      const response = await fetch(`http://localhost:8080/notice/${noticeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to delete notice");
      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== noticeId));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-purple-500 to-purple-300 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold text-white">📢 Manage Notices</h1>
      <form onSubmit={addNotice} className="space-y-6">
        <div>
          <label className="block text-white font-semibold">Class:</label>
          <input type="text" id="className" value={formData.className} onChange={handleInputChange} required className="w-full p-2 border bg-white border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-white font-semibold">Title:</label>
          <textarea id="title" value={formData.title} onChange={handleInputChange} required className="w-full p-2 border bg-white border-gray-300 rounded-md"></textarea>
        </div>
        <div>
          <label className="block text-white font-semibold">Date:</label>
          <input type="date" id="date" value={formData.date} onChange={handleInputChange} required className="w-full p-2 border bg-white border-gray-300 rounded-md" />
        </div>
        <div className="flex justify-center gap-4">
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          {editingIndex !== null ? "Update Notice" : "Add Notice"}
        </button>
        </div>
      </form>
      <h2 className="text-xl font-semibold text-white mt-8">📋 Notice List</h2>
      <ul className="mt-4 space-y-3">
        {notices.map((notice) => (
          <li key={notice._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
            <h3 className="text-lg font-bold">{notice.className}</h3>
            <p>{notice.title}</p>
            <p className="text-gray-600">Date: {notice.date}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleDeleteNotice(notice._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
                 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
