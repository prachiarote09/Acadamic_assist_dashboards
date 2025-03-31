const router = require('express').Router();
const express = require('express');

//This code was used for checking signup and login taking correct input and working correctly before validation and datbase connection.
/*
router.post('/login',(req,res) =>{
    res.send('login sucess');
});

router.post('/signup',(req,res) =>{
    res.send('signup sucess');
});
*/

const { login } = require('../Controllers/StudentController');
const {loginValidation} = require('../Middlewares/StudentValidation');

router.post('/login',loginValidation,login);

module.exports=router;