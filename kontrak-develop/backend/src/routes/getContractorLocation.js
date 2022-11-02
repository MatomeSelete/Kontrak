const express = require('express') //how we create express app
const app = express.Router()

//reuire body parser to parse the body through the get method in json format
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const getLocationById= require("../controllers/getContractorLocation"); //require the controller to routes into the const variable 

//respond with the location of contractor using their id when get request is made
app.get("/getLocationById/:contractor_id", getLocationById.getLocation); 

module.exports=app //expose app as a module
