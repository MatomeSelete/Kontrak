const pool = require("../configs/database");
const express = require('express')
const app = express.Router()
const bodyparser = require('body-parser');

//post a review
exports.postReview = (req, res) => {
    try {
        
        const userId = parseInt(req.params.id)
        const {rating, comment, contractor_id, user_id, firstname } = req.body;


        pool.query('INSERT INTO review(rating, comment, contractor_id, user_id, firstname) VALUES ($1, $2,$3,$4,$5);', [
            rating, comment, contractor_id, user_id, firstname], (error) => {
            if (error) {
                res.status(500).json
                ({
                  message: error,
                });
            }
            res.status(200).json(`review posted for user : ${userId}`);
        });


    } catch (error) {

        res.status(400).json(`not created:`)
    }
};

//////////////////////
/////get review



//get review
exports.getReview = (req, res) => {
    const contractor_id =parseInt(req.params.contractor_id)
    console.log('revs ',contractor_id );
    try {
      

        pool.query('Select * from  review where contractor_id=$1; ',[contractor_id], (error,results) => {
            if (error) {
                res.status(500).json(error);
            }
            res.status(200).json(results.rows);
        });


    } catch (error) {

        res.status(400).send(`Not get data:`)
    }
};

