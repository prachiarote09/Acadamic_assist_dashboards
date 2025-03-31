import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Bca from "./Bca/Bca";
import Bms from "./Bms/Bms";
import Bcom from "./Bcom/Bcom";
import Bscit from "./BcsIt/Bscit";
import Examtime from "./Bca/Examtime";
import Percentage from "./Bca/Percentage";
import Questionpaper from "./Bca/Questionpaper";
import Questionbank from "./Bca/Questionbank";
import Bmstime from "./Bms/Bmstime";
import BmsPercentages from "./Bms/BmsPercentages";
import BmsQuestionPaper from "./Bms/BmsQuestionPaper";
import BmsQuestionBnak from "./Bms/BmsQuestionBnak";
import Bcomtime from "./Bcom/Bcomtime";
import BcomPercentag from "./Bcom/BcomPercentag";
import Bcomepaper from "./Bcom/Bcomepaper";
import Bcombank from "./Bcom/Bcombank";
import Bsctime from "./BcsIt/Bsctime";
import BcsPercenatge from "./BcsIt/BcsPercenatge";
import Bcspaper from "./BcsIt/Bcspaper";
import BcsBank from "./BcsIt/BcsBank";
import BcaCourse from "./Bca/BcaCourse";
import Bcomcourse from "./Bcom/Bcomcourse";
import Bsccourse from "./BcsIt/Bsccourse";
import Bmscourse from "./Bms/Bmscourse";



function Examination() {
  return (
    <div className="font-sans min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-center bg-purple-800 text-white p-4 space-x-6">
        <Link to="/admin-dashboard/examination/bca" className="cursor-pointer hover:underline">BCA</Link>
        <Link to="/admin-dashboard/examination/bms" className="cursor-pointer hover:underline">BMS</Link>
        <Link to="/admin-dashboard/examination/bcom" className="cursor-pointer hover:underline">BCOM</Link>
        <Link to="/admin-dashboard/examination/bscit" className="cursor-pointer hover:underline">BScIT</Link>
      </nav>

      {/* Routes to Course Pages */}
      <Routes>
        <Route path="/" element={<Navigate to="bca" />} />
        <Route path="bca" element={<Bca />} />
        <Route path="bms" element={<Bms />} />
        <Route path="bcom" element={<Bcom />} />
        <Route path="bscit" element={<Bscit />} />

        {/* BCA Subroutes */}
        <Route path="bca/exam-timetable" element={<Examtime />} />
        <Route path="bca/percentage" element={<Percentage />} />
        <Route path="bca/previousyear" element={<Questionpaper />} />
        <Route path="bca/questionbank" element={<Questionbank />} />
        <Route path="bca/course-overview" element={<BcaCourse />} />

        {/* bms route */}
        <Route path="bms" element={<Bms />} />
        <Route path="bms/exam-timetable" element={<Bmstime/>} />
        <Route path="bms/percentage" element={<BmsPercentages/>} />
        <Route path="bms/previousyear" element={<BmsQuestionPaper />} />
        <Route path="bms/questionbank" element={<BmsQuestionBnak />} />
          <Route path="bms/bmscourse" element={<Bmscourse/>}/>
           {/* bcom path */}
        <Route path="bcom" element={<Bcom />} />
         <Route path="bcom/exam-timetable" element={<Bcomtime />} />
         <Route path="bcom/percentage" element={<BcomPercentag />} />
         <Route path="bcom/previousyear" element={<Bcomepaper />} />
          <Route path="bcom/questionbank" element={<Bcombank/>} />
          <Route path="bcom/bcomcourse" element={<Bcomcourse/>} />

              {/* BScIT Routes */}
               <Route path="bscit" element={<Bscit />} />
               <Route path="bscit/exam-timetable" element={<Bsctime />} />
               <Route path="bscit/percentage" element={<BcsPercenatge />} />
               <Route path="bscit/previousyear" element={<BcsBank />} />
               <Route path="bscit/questionbank" element={<Bcspaper />} />
               <Route path="bscit/bsccourse" element={<Bsccourse />} />
               {/* bcomcourse */}

      </Routes>
    </div>
  );
}

export default Examination;
