const express = require('express')
const app = express()


const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const getRev= require("../controllers/reviews");
const postRev=require("../controllers/reviews")

app.post('/postReview/:id', postRev.postReview)
app.get('/getReview/:contractor_id', getRev.getReview)

module.exports=app
