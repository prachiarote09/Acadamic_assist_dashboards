import React, { useState, useEffect } from "react";
import { openDB } from "idb";

// IndexedDB Config
const DB_NAME = "QuestionBankDB";
const STORE_NAME = "questions";

// Initialize IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

const Questionbank = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch questions from IndexedDB on load
  useEffect(() => {
    const fetchQuestions = async () => {
      const db = await initDB();
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const allQuestions = await store.getAll();
      setQuestions(allQuestions);
    };

    fetchQuestions();
  }, []);

  // Handle File Upload
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

  // Add or Update Question
  const addOrUpdateQuestion = async () => {
    if (!questionText.trim()) {
      alert("Please enter a question!");
      return;
    }

    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const newQuestion = {
      id: currentId || Date.now(),
      text: questionText,
      pdf: pdfFile,
      img: imgFile,
    };

    if (isEditing) {
      // Update existing question
      await store.put(newQuestion);
      setIsEditing(false);
      setCurrentId(null);
    } else {
      // Add new question
      await store.add(newQuestion);
    }

    // Refresh question list
    setQuestions(await store.getAll());

    // Reset form
    setQuestionText("");
    setPdfFile(null);
    setImgFile(null);
  };

  // Edit Question
  const editQuestion = (question) => {
    setQuestionText(question.text);
    setPdfFile(question.pdf);
    setImgFile(question.img);
    setIsEditing(true);
    setCurrentId(question.id);
  };

  // Remove Question
  const removeQuestion = async (id) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    setQuestions(await store.getAll());
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">📚 Question Bank</h1>

        {/* Input Fields */}
        <div className="mb-4 space-y-3">
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter question text"
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, "pdf")}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "image")}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={addOrUpdateQuestion}
            className={`w-full py-2 text-white font-semibold rounded ${
              isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? "Update Question" : "Add Question"}
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center">No questions added yet.</p>
          ) : (
            questions.map((question) => (
              <div key={question.id} className="p-4 border rounded-lg bg-gray-50 shadow-md">
                <p className="font-semibold">{question.text}</p>

                {question.pdf && (
                  <button
                    onClick={() => setSelectedQuestion(question)}
                    className="text-blue-500 underline block mt-2"
                  >
                    📄 View PDF
                  </button>
                )}
                {question.img && (
                  <img
                    src={question.img}
                    alt="Question"
                    className="w-32 h-32 object-cover rounded-lg shadow mt-2"
                  />
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setSelectedQuestion(question)}
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    👀 View
                  </button>
                  <button
                    onClick={() => editQuestion(question)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Viewing a Question */}
      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">📌 Question Details</h2>
            <p className="mb-3 text-gray-800 font-medium">{selectedQuestion.text}</p>

            {selectedQuestion.pdf && (
              <iframe
                src={selectedQuestion.pdf}
                className="w-full h-64 border rounded-lg"
                title="PDF Viewer"
              ></iframe>
            )}
            {selectedQuestion.img && (
              <img
                src={selectedQuestion.img}
                alt="Question"
                className="w-full rounded-lg shadow mb-3"
              />
            )}

            <button
              onClick={() => setSelectedQuestion(null)}
              className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionbank;
