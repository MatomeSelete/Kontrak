const  express  =  require("express");
const cors = require('cors');
const app = express(); //Initialized express
app.use(cors())
require("../backend/src/configs/dotenv");

const client  =  require("../backend/src/configs/database");
app.use(express.json());

//my routes
//const profile = require("./src/routes/postJob");
const login  = require("./src/routes/login");
const postJob  = require("./src/routes/postJob");
const getContractor = require("./src/routes/getContractorType");
const getkontak = require("./src/routes/getContractor.route");
const postReview =require("./src/routes/reviews")
const getReview =require("./src/routes/reviews")
const getLocation  = require("./src/routes/getContractorLocation");
const getSubCategory = require("./src/routes/getSubCategory");
const getRequestedjob=require("./src/routes/postJob");
const lookups = require ('./../backend/src/routes/look.routes');


const dashboard = require('./src/routes//dashnboard.routes')
const profile = require("./src/routes/profile.routes")
const  user  =  require("./src/routes/users.routes");
const getRequests = require('./src/routes/getContractor.route')

const forgotPassword = require('./src/routes/password.route');
//const { getRequestedjob } = require("./src/controllers/postJob");
const tracks= require('../backend/src/routes/tracker.routes')

app.use("/api",  user);
app.use("/api",  login);
app.use("/api", profile)
app.use('/api', forgotPassword)
app.use('/api', lookups )
app.use('/api', getkontak )
app.use('/dashboard', dashboard)
app.use('/api', getRequests)
//exporting api endpoints
app.use("/api" , login);
app.use("/api" , postJob); 
app.use("/api", postReview)
app.use("/api",getReview);
app.use("/api", getContractor);
app.use("/api", getLocation);
app.use("/api", getSubCategory)
app.use("/api" , tracks);  


const port = process.env.PORT || 5400;

client.connect((err) =>{ // Connect to the Database
    if (err) {
       console.log(err )
      }
   else {
     console.log("Data logging initialised 123");
    }
 }); 

app.get("/", (req, res) => {

res.status(200).send("Engine Started, Ready to take off!");

})
//exporting api endpoints
app.use("/api", login);
app.use("/api", postJob); 
app.use("/api", postReview)
app.use("/api", getReview);
app.use("/api", getContractor);
app.use("/api", getLocation);
app.use("/api", getSubCategory);
app.use("/api", getRequestedjob);



app.listen(port, () => {
 
console.log(`Here we go, Engines started at ${port}.`);

}) 

