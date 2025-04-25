import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import Bcaexamination from "./Bcaexamination/Bcaexamination";
import Bmsexamination from "./Bmsexamination/Bmsexamination";
import Bcomexamiation from "./Bcomexamination/Bcomexamiation";
import Bsciexmaination from "./Bcsitexamination/Bsciexmaination";
import StudentExamtime from "./Bcaexamination/StudentExamtime";
import StudentCourse from "./Bcaexamination/StudentCourse";
import StudentQuestionpaper from "./Bcaexamination/StudentQuestionpaper";
import BcaStudentBank from "./Bcaexamination/BcaStudentBank";
import Bcastudentresult from "./Bcaexamination/Bcastudentresult";
import Bcomexamtimetable from "./Bcomexamination/Bcomexamtimetable";
import BcomeCourse from "./Bcomexamination/BcomeCourse";
import Bcomquestionpaper from "./Bcomexamination/Bcomquestionpaper";
import BcomBank from "./Bcomexamination/BcomBank";
import Bcomeresult from "./Bcomexamination/Bcomeresult";
import Bcsittimetable from "./Bcsitexamination/Bcsittimetable";
import BcsiteCourse from "./Bcsitexamination/BcsiteCourse";
import Bcsitepaper from "./Bcsitexamination/Bcsitepaper";
import BcsiteBank from "./Bcsitexamination/BcsiteBank";
import Bcsitresult from "./Bcsitexamination/Bcsitresult";
import Bmstimetable from "./Bmsexamination/Bmstimetable";
import BmsCourse from "./Bmsexamination/BmsCourse";
import BmsPaper from "./Bmsexamination/BmsPaper";
import BmsBank from "./Bmsexamination/BmsBank";
import Bmsresult from "./Bmsexamination/Bmsresult";

function StudentExamination() {
  return (
    <div className="p-6">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white p-4 rounded-md flex justify-around">
        <Link
          to="/user-dashboard/examinations/bca"
          className="hover:underline"
        >
          BCA
        </Link>
        <Link
          to="/user-dashboard/examinations/bms"
          className="hover:underline"
        >
          BMS
        </Link>
        <Link
          to="/user-dashboard/examinations/bcom"
          className="hover:underline"
        >
          BCom
        </Link>
        <Link
          to="/user-dashboard/examinations/bscit"
          className="hover:underline"
        >
          BScIT
        </Link>
      </nav>

      {/* Routing for each section */}
      <Routes>
        {/* Default route redirects to BCA */}
        <Route
          path="/"
          element={<Navigate to="bca" replace />}
        />
        <Route path="bca" element={<Bcaexamination />} />
        <Route path="bms" element={<Bmsexamination />} />
        <Route path="bcom" element={<Bcomexamiation />} />
        <Route path="bscit" element={<Bsciexmaination />} />

         {/* bca route */}
        <Route path="bca/exam-timetable" element={<StudentExamtime />} />
        <Route path="bca/course-overview" element={<StudentCourse />} />
        <Route path="bca/previous-paper" element={<StudentQuestionpaper/>} />
        <Route path="bca/question-bank" element={<BcaStudentBank />} />
        <Route path="bca/percentage" element={<Bcastudentresult />} />

        {/* bms */}
        <Route path="bcom/exam-timetable" element={<Bcomexamtimetable />} />
        <Route path="bcom/course-overview" element={<BcomeCourse />} />
        <Route path="bcom/previous-paper" element={<Bcomquestionpaper />} />
        <Route path="bcom/question-bank" element={<BcomBank />} />
        <Route path="bcom/percentage" element={<Bcomeresult />} />

        {/* bscit */}
        <Route path="bscit/exam-timetable" element={<Bcsittimetable/>} />
        <Route path="bscit/course-overview" element={<BcsiteCourse />} />
        <Route path="bscit/previous-paper" element={<Bcsitepaper />} />
        <Route path="bscit/question-bank" element={<BcsiteBank/>} />
        <Route path="bscit/percentage" element={<Bcsitresult />} />

        {/* bms path */}
        <Route path="bms/exam-timetable" element={<Bmstimetable />} />
         <Route path="bms/course-overview" element={<BmsCourse />} />
         <Route path="bms/previous-paper" element={<BmsPaper/>} />
         <Route path="bms/question-bank" element={<BmsBank/>} />
         <Route path="bms/percentage" element={<Bmsresult />} />
 
      </Routes>
    </div>
  );
}

export default StudentExamination;
