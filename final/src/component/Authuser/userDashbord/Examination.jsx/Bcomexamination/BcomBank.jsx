import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { FaEye, FaDownload } from "react-icons/fa";

const DB_NAME = "bcom-bank-db";
const STORE_NAME = "questions";

const BcomBank = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // ✅ Open IndexedDB and load questions
  useEffect(() => {
    const loadQuestions = async () => {
      const db = await openDB(DB_NAME, 1);
      const allQuestions = await db.getAll(STORE_NAME);
      setQuestions(allQuestions);
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
    <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-700">
          📝 BCA Question Bank
        </h1>

        {/* List of Questions */}
        <div className="space-y-4 sm:space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center">No Question Bank Available.</p>
          ) : (
            questions.map((question) => (
              <div
                key={question.id}
                className="p-4 sm:p-5 border rounded-lg bg-gray-50 shadow-md"
              >
                <p className="font-semibold text-lg text-gray-800">{question.text}</p>

                {/* PDF and Image Buttons */}
                <div className="mt-4 flex flex-wrap gap-3 sm:gap-4">
                  {/* PDF Options */}
                  {question.pdf && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-all"
                      >
                        <FaEye />
                        View PDF
                      </button>
                      <button
                        onClick={() => downloadFile(question.pdf, "document.pdf")}
                        className="bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-all"
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
                        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2 hover:bg-blue-600 transition-all"
                      >
                        <FaEye />
                        View Image
                      </button>
                      <button
                        onClick={() => downloadFile(question.img, "image.png")}
                        className="bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-2 hover:bg-green-600 transition-all"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">📌 Exam Details</h2>
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

export default BcomBank;
