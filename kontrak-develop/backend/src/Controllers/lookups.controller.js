const pool = require("../../../backend/src/configs/database");


//==============getcategory==========
module.exports.getCategories = (req, res) => {

    const user_id = req.params.user_id;
    pool.query(
      `SELECT * FROM lookupcategory`,
      (error, results) => {
        //returns all 
        if (error) {
          //checks for errors and return them
          res.status(500).json
  ({
    message: error,
  }); //Throw the error in the terminal
        }
        res.status(200).json(results.rows); //Return a status 200 if there is no error
      }
  
    )
  }

//==============get subcategory==========
  module.exports.getSubCategories = (req, res) => {

    
 
    pool.query(
      `SELECT * FROM lookupSubcategory `,
      (error, results) => {
        //returns all 
        if (error) {
          //checks for errors and return them
          res.status(500).json
  ({
    message: error,
  }); //Throw the error in the terminal
        }
        // console.log(results.rows);
        res.status(200).json(results.rows); //Return a status 200 if there is no error
      }
  
    )
  }
  //==============get location/==========
  module.exports.getLocation = (req, res) => {

    
 
    pool.query(
      `select distinct(location)  from contractor;`,
      (error, results) => {
        //returns all 
        if (error) {
          //checks for errors and return them
          res.status(500).json
  ({
    message: error,
  }); //Throw the error in the terminal
        }
        // console.log(results.rows);
        res.status(200).json(results.rows); //Return a status 200 if there is no error
      }
  
    )
  }