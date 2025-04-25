const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();


//Student Routing
const studentRoute = require('./Routes/StudentRouts')
const AuthRouter = require('./Routes/AuthRouter');
const StudentLogin = require('./Routes/StudentLoginRoute');
const EventRouter = require("./Routes/EventRouter");
const NoticeRouter = require("./Routes/NoticeRouter");
const FeedbackRouter = require("./Routes/FeedbackRouter");
const culturalCommitteeRoutes = require("./Routes/culturalCommitteeRoutes");
const sportCommitteeRoutes = require("./Routes/sportCommitteeRoutes");
const raggingCommitteeRoutes = require("./Routes/raggingCommitteeRoutes");
const EventModel = require("./Models/Event");
const NoticeModel = require("./Models/Notice");
const studentCommitteeRoutes = require("./Routes/studentCommitteeRoute");
const TechDreamerRoutes = require("./Routes/techRoutes");




app.use(express.json()); // Ensure JSON parsing middleware is added
app.use(bodyParser.json());
app.use(cors());

app.use('/auth',AuthRouter);
app.use('/student',studentRoute)
app.use('/user',StudentLogin);
app.use("/event", EventRouter);
app.use("/notice", NoticeRouter);
app.use("/feedback",FeedbackRouter);
app.use("/api/cultural", culturalCommitteeRoutes);
app.use("/api/sport", sportCommitteeRoutes);
app.use("/api/ragging", raggingCommitteeRoutes);
app.use("/api/studentCommittee", studentCommitteeRoutes);
app.use("/api/techdreamercommittiee", TechDreamerRoutes);

const db=require('./Models/db');
const FeedbackModel = require("./Models/Feedback");
db();

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})
// app.get("/student", async (req, res) => {
//   try {
//     const students = await Student.find(); // Fetch all students
//     res.json({ data: students });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching students", error });
//   }
// });


app.get("/event", async (req, res) => {
    try {
      const events = await EventModel.find(); // Fetch events from MongoDB
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/notice", async (req, res) => {
    try {
      const notices = await NoticeModel.find(); // Fetch events from MongoDB
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get("/feedback", async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.find(); // Fetch events from MongoDB
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // app.get("/cultural", async (req, res) => {
  //   try {
  //     const cultural = await CulturalModel.find(); // Fetch events from MongoDB
  //     res.json(cultural);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });






