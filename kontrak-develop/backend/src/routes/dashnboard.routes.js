const express = require('express')
const app = express()
const dashboard = require('../Controllers/dashboard.controller')



app.get('/jobreq/:contractor_id', dashboard.getRequestss)
app.get('/avgrating/:contractor_id', dashboard.Rating)
app.get('/activeJob/:contractor_id',dashboard.activeJob)
app.patch('/updateStatus/:job_id',dashboard.updateStatus)


module.exports = app