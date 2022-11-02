const cloudinary = require("../../../backend/src/cloudinary/clouudinary");
const pool = require("../../src/configs/database");
const express = require('express')
const app = express.Router()

module.exports.postJob = async(req , res) =>{

    try{ 
      const {user_id, description , category, subcategory, job_date,location, image} = req.body;
     

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "/jobpost/",
      });



 


       console.log('data ',user_id, description , category, subcategory, job_date,location)
        pool.query(`INSERT INTO jobpost ( user_Id, description , category, subcategory, jobImg, job_date,location)  VALUES ($1,$2,$3,$4,$5,$6, $7);`,[
           user_id, description , category, subcategory,result.secure_url, job_date, location], 
            (err) => {
                if (err) {
                  flag = 0; //If user is not inserted to database assign flag as 0/false.
                  console.error(err);
                  return res.status(500).json({
                    error: "Database error",
                  });

                } else {
                  flag = 1;
                  res
                    .status(200)
                    .send({ message: "post added to database" });
                }
              
        });

        
    }
    catch (err) {
        res.status(500).json({
            message: "Database error when uploading job", 
        });
    };
  }



const bodyparser = require('body-parser');


exports.getRequestedjob = (req, res) => {

    const contractor_id = parseInt(req.params.contractor_id)
    
    try {
      

    const contractor_id = parseInt(req.params.contractor_id)

        pool.query('select jobpost.job_id, jobpost.description, jobpost.status, users.firstname from jobpost, contractor , users where users.user_id=contractor.user_id AND jobpost.contractor_id = contractor.contractor_id AND contractor.contractor_id = $1;',[contractor_id], (error,results) => {

            if (error) {
              res.status(500).json
              ({
                message: error,
              });
            }
            res.status(200).json(results.rows);

        });


    } catch (error) {

        res.status(400).send(`could not fetch data`)
    }
};
  
