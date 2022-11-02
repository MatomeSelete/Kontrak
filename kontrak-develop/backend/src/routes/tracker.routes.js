const express = require('express')
const app = express();
const kontrak=require('../Controllers/tracker.controller')

app.post('/createTask',kontrak.createTasks)
app.get('/getTasks/:id',kontrak.getTasks)
app.put('/updatestatus/:id',kontrak.updateTaskStatus)
app.get('/getdone/:id', kontrak.getDoneTasks)

module.exports=app
