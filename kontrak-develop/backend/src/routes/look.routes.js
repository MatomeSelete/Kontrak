const express = require('express')
const app = express();

const  lookups  = require("../controllers/lookups.controller");
app.get('/getcate', lookups.getCategories)
app.get('/getsub', lookups.getSubCategories)
app.get('/getloc',lookups.getLocation)

module.exports=app
