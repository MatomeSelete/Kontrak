const express = require('express')//how we create express app
const app = express()


//require body parser to parse the body through the get method in json format
const bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//require the controller to routes into the const variable 

const { login } = require("../controllers/login");

//post to database with the user using their email and password  when post request is made
app.post('/login/',login) //post route

module.exports = app//expose app as a module
