import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { FaEye, FaDownload, FaTimes } from "react-icons/fa";

const DB_NAME = "BmsQuestionDB";
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

const BmsPaper = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch questions from IndexedDB on mount
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

  // Open modal to view PDF or Image
  const viewDetails = (question) => {
    setSelectedQuestion(question);
  };

  // Close modal
  const closeModal = () => {
    setSelectedQuestion(null);
  };

  // Download PDF or Image
  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700">
          📚 BMS Question Bank
        </h1>

        {/* Display Course Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No PDFs or images available.
            </p>
          ) : (
            questions.map((question) => (
              <div
                key={question.id}
                className="p-4 border rounded-lg bg-gray-50 shadow-md transition hover:shadow-lg hover:scale-105"
              >
                <p className="font-semibold text-lg text-gray-800">{question.text}</p>

                {/* Buttons for View and Download */}
                <div className="mt-4 flex flex-wrap gap-4">
                  {/* View PDF */}
                  {question.pdf && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
                      >
                        <FaEye />
                        View PDF
                      </button>
                      <button
                        onClick={() => downloadFile(question.pdf, "document.pdf")}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
                      >
                        <FaDownload />
                        Download PDF
                      </button>
                    </>
                  )}

                  {/* View Image */}
                  {question.img && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
                      >
                        <FaEye />
                        View Image
                      </button>
                      <button
                        onClick={() => downloadFile(question.img, "image.png")}
                        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md sm:max-w-lg w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">
              📌 Course Details
            </h2>
            <p className="mb-3 text-gray-800 font-medium">{selectedQuestion.text}</p>

            {/* PDF Preview */}
            {selectedQuestion.pdf && (
              <iframe
                src={selectedQuestion.pdf}
                className="w-full h-56 sm:h-64 border rounded-lg"
                title="PDF Viewer"
              />
            )}

            {/* Image Preview */}
            {selectedQuestion.img && (
              <img
                src={selectedQuestion.img}
                alt="Uploaded"
                className="w-full h-auto rounded-lg shadow mb-3"
              />
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full mt-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BmsPaper;
