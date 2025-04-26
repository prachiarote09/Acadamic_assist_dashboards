import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoCalendarSharp } from "react-icons/io5";

const Result = () => {
  const [questionText, setQuestionText] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setresults] = useState([]);

  useEffect(() => {
    fetchresults();
  }, []);

  const fetchresults = async () => {
    try {
      const res = await axios.get("http://localhost:8080/result/");
      setresults(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "pdf") setPdfFile(file);
      if (type === "image") setImgFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!questionText.trim()) {
      alert("Please enter a question!");
      return;
    }

    if (!pdfFile && !imgFile) {
      alert("Please upload a PDF or image file.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("text", questionText);
      if (pdfFile) formData.append("pdf", pdfFile);
      if (imgFile) formData.append("img", imgFile);

      await axios.post("http://localhost:8080/result/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuestionText("");
      setPdfFile(null);
      setImgFile(null);
      fetchresults(); // Refresh list after upload
      alert("result uploaded successfully!");
    } catch (err) {
      console.error("Error uploading data:", err);
      setError("Failed to upload. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/result/${id}`, {
        method: 'DELETE',
      });

      // Check if the response is OK
      if (response.ok) {
        alert('results deleted successfully');
        fetchresults(); // Refresh the list of results
      } else {
        // Handle non-OK responses, such as errors
        let data = {};
        try {
          data = await response.json(); // Attempt to parse JSON response
        } catch (jsonError) {
          // If JSON parsing fails, display a generic error message
          data.error = "Failed to parse server response";
        }
        alert(data.error || 'Failed to delete result');
      }
    } catch (error) {
      console.error('Error deleting result:', error);
      alert('An error occurred while deleting the result');
    }
  };

  const openInNewTab = (base64Data, mimeType) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<iframe src="data:${mimeType};base64,${base64Data}" 
          frameborder="0" 
          style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" 
          allowfullscreen>
        </iframe>`
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Upload Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          <IoCalendarSharp className="text-blue-500 inline mr-2" />
          Exam result
        </h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4 space-y-3">
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter result text"
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
            onClick={handleSubmit}
            className="w-full py-2 text-white font-semibold rounded bg-purple-500 hover:bg-purple-600"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload result"}
          </button>
        </div>
      </div>

      {/* List of Uploaded results */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-2">Uploaded results</h2>
        {results.map((entry) => (
          <div key={entry._id} className="bg-white p-4 rounded shadow flex flex-col space-y-2">
            <p className="font-semibold text-lg">{entry.text}</p>
            <div className="flex flex-wrap gap-2">
              {entry.img && (
                <button
                  onClick={() => openInNewTab(entry.img, "image/png")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Image
                </button>
              )}
              {entry.pdf && (
                <button
                  onClick={() => openInNewTab(entry.pdf, "application/pdf")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View PDF
                </button>
              )}
              <button
                onClick={() => handleDelete(entry._id)} // Use entry._id for delete
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {results.length === 0 && <p className="text-gray-500">No results uploaded yet.</p>}
      </div>
    </div>
  );
};

export default Result;
