import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { IoCalendarSharp } from "react-icons/io5";

const DB_NAME = "BcomTimetableDB";
const STORE_NAME = "timetable";

const Bcomtime = () => {
  const [timetables, setTimetables] = useState([]);
  const [text, setText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  // Open IndexedDB
  const openDatabase = async () => {
    return await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        }
      },
    });
  };

  // Load data from IndexedDB
  const loadTimetables = async () => {
    const db = await openDatabase();
    const allTimetables = await db.getAll(STORE_NAME);
    setTimetables(allTimetables);
  };

  useEffect(() => {
    loadTimetables();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "pdf") setPdfFile(reader.result);
        if (type === "image") setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveToDB = async (timetable) => {
    const db = await openDatabase();
    if (isEditing) {
      await db.put(STORE_NAME, { ...timetable, id: currentId });
    } else {
      await db.add(STORE_NAME, timetable);
    }
    loadTimetables();
    setIsEditing(false);
    setCurrentId(null);
  };

  const addOrUpdateTimetable = async () => {
    if (!text.trim()) {
      alert("Please enter a timetable entry!");
      return;
    }
    const newTimetable = { text, pdf: pdfFile, img: imgFile };
    await saveToDB(newTimetable);
    setText("");
    setPdfFile(null);
    setImgFile(null);
  };

  const editTimetable = (timetable) => {
    setText(timetable.text);
    setPdfFile(timetable.pdf);
    setImgFile(timetable.img);
    setIsEditing(true);
    setCurrentId(timetable.id);
  };

  const removeTimetable = async (id) => {
    const db = await openDatabase();
    await db.delete(STORE_NAME, id);
    loadTimetables();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4"> <IoCalendarSharp className="text-blue-500" /> Exam Timetable</h1>
        <div className="mb-4 space-y-3">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter timetable details" className="w-full p-2 border rounded" />
          <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "pdf")} className="w-full p-2 border rounded" />
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "image")} className="w-full p-2 border rounded" />
          <button onClick={addOrUpdateTimetable} className={`w-full py-2 text-white font-semibold rounded ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"}`}>
            {isEditing ? "Update Timetable" : "Add Timetable"}
          </button>
        </div>
        <div className="space-y-4">
          {timetables.length === 0 ? (
            <p className="text-gray-500 text-center">No Timetable added yet.</p>
          ) : (
            timetables.map((timetable) => (
              <div key={timetable.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <p className="font-semibold">{timetable.text}</p>
                {timetable.pdf && <button onClick={() => setSelectedTimetable(timetable)} className="text-blue-500 underline block mt-2">📄 View PDF</button>}
                {timetable.img && <img src={timetable.img} alt="Timetable" className="w-32 h-32 object-cover rounded-lg shadow mt-2" />}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setSelectedTimetable(timetable)} className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">👀 View</button>
                  <button onClick={() => editTimetable(timetable)} className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">✏️ Edit</button>
                  <button onClick={() => removeTimetable(timetable.id)} className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">🗑️ Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedTimetable && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">📌 Exam Details</h2>
            <p className="mb-3 text-gray-800 font-medium">{selectedTimetable.text}</p>
            {selectedTimetable.pdf && <iframe src={selectedTimetable.pdf} className="w-full h-64 border rounded-lg" title="PDF Viewer"></iframe>}
            {selectedTimetable.img && <img src={selectedTimetable.img} alt="Timetable" className="w-full rounded-lg shadow mb-3" />}
            <button onClick={() => setSelectedTimetable(null)} className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bcomtime;