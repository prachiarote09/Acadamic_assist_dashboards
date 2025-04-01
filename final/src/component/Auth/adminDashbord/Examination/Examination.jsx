import React from "react";
import { Routes, Route } from "react-router-dom";
import Bca from "./Bca/Bca";
import Examtime from "./Bca/Examtime";
import Percentage from "./Bca/Percentage";
import Questionpaper from "./Bca/Questionpaper";
import Questionbank from "./Bca/Questionbank";
import BcaCourse from "./Bca/BcaCourse";

function Examination() {
  return (
    <div className="font-sans min-h-screen">
      {/* Routes to Course Pages */}
      <Routes>
        {/* Default route for /admin-dashboard/examination */}
        <Route path="" element={<Bca />} />
        
        {/* BCA Subroutes */}
        <Route path="bca/*" element={<Bca />} />
        <Route path="bca/exam-timetable" element={<Examtime />} />
        <Route path="bca/percentage" element={<Percentage />} />
        <Route path="bca/previousyear" element={<Questionpaper />} />
        <Route path="bca/questionbank" element={<Questionbank />} />
        <Route path="bca/course-overview" element={<BcaCourse />} />
      </Routes>
    </div>
  );
}

export default Examination;