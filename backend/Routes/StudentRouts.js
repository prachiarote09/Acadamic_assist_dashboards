const express = require("express");

const ensureAuthenticated = require("../Middlewares/Auth");
const { createStudent, fetchAllData, fetchSingleData } = require("../Controllers/FormController");

const studentRoute = express.Router();

studentRoute.post('/',ensureAuthenticated,createStudent);
studentRoute.get('/',ensureAuthenticated,fetchAllData);
studentRoute.get('/:id',ensureAuthenticated,fetchSingleData);

module.exports = studentRoute;