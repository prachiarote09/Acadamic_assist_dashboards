import React, { useEffect, useState } from "react";
import axios from "axios";

const Questionpaper = () => {
  const [questionpapers, setQuestionpapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/questionpapers/");
        setQuestionpapers(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

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

  const downloadFile = (base64Data, mimeType, fileName) => {
    const blob = base64ToBlob(base64Data, mimeType);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const base64ToBlob = (base64Data, mimeType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  };

  const filteredQuestionpapers = questionpapers.filter((entry) =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      {/* Top Bar: Title and Search */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">📄 Exam Question Papers</h2>
        <input
          type="text"
          placeholder="Search question paper..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Question Paper Cards */}
      {filteredQuestionpapers.length === 0 ? (
        <p className="text-center text-gray-500">No question paper found.</p>
      ) : (
        filteredQuestionpapers.map((entry, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow mb-4">
            <p className="font-semibold text-lg mb-4">{entry.text}</p>
            <div className="flex flex-wrap gap-2">
              {entry.img && (
                <>
                  <button
                    onClick={() => openInNewTab(entry.img, "image/png")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Image
                  </button>
                  <button
                    onClick={() =>
                      downloadFile(entry.img, "image/png", `${entry.text}.png`)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download Image
                  </button>
                </>
              )}
              {entry.pdf && (
                <>
                  <button
                    onClick={() => openInNewTab(entry.pdf, "application/pdf")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    View PDF
                  </button>
                  <button
                    onClick={() =>
                      downloadFile(entry.pdf, "application/pdf", `${entry.text}.pdf`)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Download PDF
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Questionpaper;
