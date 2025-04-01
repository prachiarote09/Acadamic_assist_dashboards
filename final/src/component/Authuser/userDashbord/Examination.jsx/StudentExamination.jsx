import React from "react";
import { Routes, Route } from "react-router-dom";
import Bcaexamination from "./Bcaexamination/Bcaexamination";
import StudentExamtime from "./Bcaexamination/StudentExamtime";
import StudentCourse from "./Bcaexamination/StudentCourse";
import StudentQuestionpaper from "./Bcaexamination/StudentQuestionpaper";
import BcaStudentBank from "./Bcaexamination/BcaStudentBank";
import Bcastudentresult from "./Bcaexamination/Bcastudentresult";

function StudentExamination() {
  return (
    <div className="font-sans min-h-screen">
      {/* Routes for Student Examination */}
      <Routes>
        {/* Default route for /user-dashboard/examinations */}
        <Route path="" element={<Bcaexamination />} />

        {/* BCA Subroutes */}
        <Route path="bca/*" element={<Bcaexamination />} />
        <Route path="bca/exam-timetable" element={<StudentExamtime />} />
        <Route path="bca/course-overview" element={<StudentCourse />} />
        <Route path="bca/previous-paper" element={<StudentQuestionpaper />} />
        <Route path="bca/question-bank" element={<BcaStudentBank />} />
        <Route path="bca/percentage" element={<Bcastudentresult />} />
      </Routes>
    </div>
  );
}

export default StudentExamination;
