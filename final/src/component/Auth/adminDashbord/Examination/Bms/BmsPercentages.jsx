import React, { useState, useEffect } from "react";
import { openDB } from "idb";

// IndexedDB Setup
const DB_NAME = "ExamDB";
const STORE_NAME = "Questions";
const DB_VERSION = 1;

// Open or create IndexedDB database
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

// Function to get all questions
const getQuestions = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

// Function to save questions
const saveQuestions = async (questions) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  questions.forEach(async (question) => {
    await store.put(question);
  });
  await tx.done;
};

// Function to add a single question
const addQuestion = async (question) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ ...question, id: Date.now() });
  await tx.done;
};

// Function to delete a question by ID
const deleteQuestion = async (id) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.objectStore(STORE_NAME).delete(id);
  await tx.done;
};

// Main React Component
const BmsPercentages = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  // Load questions from IndexedDB on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      const storedQuestions = await getQuestions();
      setQuestions(storedQuestions || []);
    };
    fetchQuestions();
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

  const addOrUpdateQuestion = async () => {
    if (!questionText.trim()) {
      alert("Please enter a question!");
      return;
    }

    const newQuestion = { text: questionText, pdf: pdfFile, img: imgFile };

    let updatedQuestions;
    if (isEditing) {
      updatedQuestions = questions.map((q) =>
        q.id === currentId ? { ...newQuestion, id: currentId } : q
      );
      setIsEditing(false);
      setCurrentIndex(null);
      setCurrentId(null);
    } else {
      updatedQuestions = [...questions, newQuestion];
      await addQuestion(newQuestion);
    }

    setQuestions(updatedQuestions);
    await saveQuestions(updatedQuestions);

    // Reset form
    setQuestionText("");
    setPdfFile(null);
    setImgFile(null);
  };

  const editQuestion = (index) => {
    const question = questions[index];
    setQuestionText(question.text);
    setPdfFile(question.pdf);
    setImgFile(question.img);
    setIsEditing(true);
    setCurrentIndex(index);
    setCurrentId(question.id);
  };

  const removeQuestion = async (id) => {
    const updatedQuestions = questions.filter((q) => q.id !== id);
    setQuestions(updatedQuestions);
    await deleteQuestion(id);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">📚 Result</h1>

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
              isEditing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
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
            questions.map((question, index) => (
              <div
                key={question.id}
                className="p-4 border rounded-lg bg-gray-50 shadow-md"
              >
                <p className="font-semibold">{question.text}</p>

                {question.pdf && (
                  <a
                    href={question.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-2"
                  >
                    📄 View PDF
                  </a>
                )}
                {question.img && (
                  <img
                    src={question.img}
                    alt="Question"
                    className="w-32 h-32 object-cover rounded-lg shadow mt-2"
                  />
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => editQuestion(index)}
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
    </div>
  );
};

export default BmsPercentages;
