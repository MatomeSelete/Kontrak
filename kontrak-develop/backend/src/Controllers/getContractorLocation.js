const pool = require("../configs/database");
const express = require('express')
const app = express.Router()


const bodyparser = require('body-parser');

//get contractor
exports.getLocation = (req, res) => {

    const contractor_id =parseInt(req.params.contractor_id)
    try {
       // 

        pool.query('SELECT location from contractor where contractor_id= $1;',[contractor_id], (error,results) => {

            if (error) {
                res.status(500).json
  ({
    message: error,
  });
            }
            res.status(200).json(results.rows);
        });


    } catch (error) {

        res.status(400).send(`not received`)
    }
};
