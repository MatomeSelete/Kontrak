//how we create express app
const express = require('express')
const app = express()
const router=express.Router()

//post route
const post =require('../controllers/postJob')

//require body parser to parse the body through the get method in json format
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const upload  = require("../middlewares/fileUpload");


const requestjob =require("../controllers/postJob")

app.post('/postJob',upload.single("image") ,post.postJob) //my api endpoint

app.get('/getRequestedjob/:contractor_id',requestjob.getRequestedjob)


module.exports = app //expose app as module
 