
const app = express();

const express = require('express')
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



const { updateName } = require("../controllers/updatename");

// app.put("/updateName/:id", updateName); //update the name of user

///////////////

app.put('/updatecard/', updatecard.update)

module.exports=app
