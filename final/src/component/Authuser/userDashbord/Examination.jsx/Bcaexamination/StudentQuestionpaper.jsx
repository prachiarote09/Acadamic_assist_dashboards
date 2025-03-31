import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { FaEye, FaDownload } from "react-icons/fa";

// Database and Store Configuration
const DB_NAME = "QuestionPaperDB";
const STORE_NAME = "questionpapers";

// ✅ Initialize IndexedDB with Object Store Creation
const initializeDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("✅ Object Store Created: questionpapers");
      }
    },
  });
};

initializeDB();

const StudentQuestionpaper = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // ✅ Open IndexedDB and load questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const db = await openDB(DB_NAME, 1);
        const allQuestions = await db.getAll(STORE_NAME);
        setQuestions(allQuestions);
      } catch (error) {
        console.error("❌ Error loading data:", error);
      }
    };

    loadQuestions();
  }, []);

  // ✅ Open Modal to View PDF or Image
  const viewDetails = (question) => {
    setSelectedQuestion(question);
  };

  // ✅ Close Modal
  const closeModal = () => {
    setSelectedQuestion(null);
  };

  // ✅ Download PDF or Image
  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-blue-700">
          📝 BCA Exam Question Papers
        </h1>

        {/* List of Questions */}
        <div className="space-y-4 md:space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center">No Question Papers available.</p>
          ) : (
            questions.map((question) => (
              <div
                key={question.id}
                className="p-3 md:p-4 border rounded-lg bg-gray-50 shadow-md"
              >
                <p className="font-semibold text-lg text-gray-800">{question.text}</p>

                {/* PDF and Image Buttons */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {/* PDF Options */}
                  {question.pdf && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-all"
                      >
                        <FaEye />
                        View PDF
                      </button>
                      <button
                        onClick={() => downloadFile(question.pdf, "document.pdf")}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-all"
                      >
                        <FaDownload />
                        Download PDF
                      </button>
                    </>
                  )}

                  {/* Image Options */}
                  {question.img && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-all"
                      >
                        <FaEye />
                        View Image
                      </button>
                      <button
                        onClick={() => downloadFile(question.img, "image.png")}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-all"
                      >
                        <FaDownload />
                        Download Image
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Viewing PDF or Image */}
      {selectedQuestion && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">📌 Question Details</h2>
            <p className="mb-3 text-gray-800 font-medium">{selectedQuestion.text}</p>

            {/* PDF Preview */}
            {selectedQuestion.pdf && (
              <iframe
                src={selectedQuestion.pdf}
                className="w-full h-64 border rounded-lg"
                title="PDF Viewer"
              />
            )}

            {/* Image Preview */}
            {selectedQuestion.img && (
              <img
                src={selectedQuestion.img}
                alt="Exam Image"
                className="w-full h-auto rounded-lg shadow mb-3"
              />
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full mt-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQuestionpaper;
