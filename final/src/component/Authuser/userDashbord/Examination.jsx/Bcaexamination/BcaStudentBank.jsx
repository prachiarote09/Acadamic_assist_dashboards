import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { FaEye, FaDownload } from "react-icons/fa";

const DB_NAME = "QuestionBankDB";
const STORE_NAME = "questions";

const BcaStudentBank = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // ✅ Open IndexedDB and load questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // ✅ Open with latest version
        const db = await openDB(DB_NAME, 2); // Updated to version 2
        const allQuestions = await db.getAll(STORE_NAME);
        setQuestions(allQuestions);
      } catch (error) {
        // ✅ Handle Version Error and Delete DB
        if (error.name === "VersionError") {
          console.warn("⚠️ Version mismatch. Resetting database...");
          await deleteDatabase();
          window.location.reload(); // Reload to recreate database
        } else {
          console.error("Error loading questions:", error);
        }
      }
    };

    loadQuestions();
  }, []);

  // ✅ Delete and Recreate Database if Version Error
  const deleteDatabase = async () => {
    await indexedDB.deleteDatabase(DB_NAME);
    console.log("✅ Database deleted successfully.");
  };

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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-blue-700">
          📝 BCA Question Bank
        </h1>

        {/* List of Questions */}
        <div className="space-y-4 sm:space-y-6">
          {questions.length === 0 ? (
            <p className="text-gray-500 text-center">No Question Bank Added.</p>
          ) : (
            questions.map((question) => (
              <div
                key={question.id}
                className="p-3 sm:p-4 border rounded-lg bg-gray-50 shadow-md"
              >
                <p className="font-semibold text-lg text-gray-800">
                  {question.text}
                </p>

                {/* PDF and Image Buttons */}
                <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-4 flex-wrap">
                  {/* PDF Options */}
                  {question.pdf && (
                    <>
                      <button
                        onClick={() => viewDetails(question)}
                        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 hover:bg-blue-600"
                      >
                        <FaEye />
                        View PDF
                      </button>
                      <button
                        onClick={() =>
                          downloadFile(question.pdf, "document.pdf")
                        }
                        className="bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 hover:bg-green-600"
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
                        className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 hover:bg-blue-600"
                      >
                        <FaEye />
                        View Image
                      </button>
                      <button
                        onClick={() =>
                          downloadFile(question.img, "image.png")
                        }
                        className="bg-green-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded flex items-center gap-1 sm:gap-2 hover:bg-green-600"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              📌 Exam Details
            </h2>
            <p className="mb-2 sm:mb-3 text-gray-800 font-medium">
              {selectedQuestion.text}
            </p>

            {/* PDF Preview */}
            {selectedQuestion.pdf && (
              <iframe
                src={selectedQuestion.pdf}
                className="w-full h-48 sm:h-64 border rounded-lg"
                title="PDF Viewer"
              />
            )}

            {/* Image Preview */}
            {selectedQuestion.img && (
              <img
                src={selectedQuestion.img}
                alt="Exam Image"
                className="w-full h-auto rounded-lg shadow mb-2 sm:mb-3"
              />
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full mt-3 sm:mt-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BcaStudentBank;
