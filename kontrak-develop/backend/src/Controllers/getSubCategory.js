const pool = require("../configs/database");
const express = require('express')
const app = express.Router()


const bodyparser = require('body-parser');

//get subcategory
exports.getSubCategory = (req, res) => {

    const category_id =parseInt(req.params.category_id)
    
    try {
       
        pool.query('select * from sub_category where category_id = $1;',[category_id], (error,results) => {

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
