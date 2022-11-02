const express = require('express')
const app = express()
const kontrak = require('../Controllers/get-Contractors.controller')


//routes

app.post('/getC', kontrak.getContractors)
app.get('/getcontra',kontrak.getCon)
app.patch('/request',kontrak.postRequest)
app.get('/getrequest',kontrak.getRequests)
app.post ('/gallery',kontrak.getGallery)

module.exports = app;