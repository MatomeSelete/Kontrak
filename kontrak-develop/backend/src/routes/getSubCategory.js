const express = require('express') //how we create express app
const app = express.Router()



//require body parser to parse the body through the get method in json format
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//require the controller to routes into the const variable 

const category_id = require("../controllers/getSubCategory");




//respond with the contractor using their id when get request is made
app.get("/getSubCategory/:category_id", category_id.getSubCategory);
 
module.exports=app//expose app as a module
