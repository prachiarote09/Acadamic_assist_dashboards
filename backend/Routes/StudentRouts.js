const express = require("express");

const ensureAuthenticated = require("../Middlewares/Auth");
const { createStudent, fetchAllData, fetchSingleData ,deleteStudent} = require("../Controllers/FormController");

const studentRoute = express.Router();

studentRoute.post('/',ensureAuthenticated,createStudent);
studentRoute.get('/',ensureAuthenticated,fetchAllData);
studentRoute.get('/:id',ensureAuthenticated,fetchSingleData);  
studentRoute.delete('/:id', ensureAuthenticated, deleteStudent);

module.exports = studentRoute;