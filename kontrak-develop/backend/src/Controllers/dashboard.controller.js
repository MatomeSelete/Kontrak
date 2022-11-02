const client = require("../../../backend/src/configs/database");


module.exports.getUserDetails = async (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  try {
    client.query(
      `select * from jobpost where user_id = $1`,
      [user_id],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: err,
          });
        } else {
          flag = 1;
          res.status(200).send(results.rows);
        }
      }
    );
  } catch (err) {}
};

module.exports.getRequestss = (req, res) => {
  const contractor_id = req.params.contractor_id;
  try {
    client.query(
      `select users.user_id,users.firstname,users.phonenumber,users.email,jobpost.contractor_id, jobpost.job_id, jobpost.description,jobpost.jobimg,jobpost.job_date
      from jobpost
      Inner join users 
      on jobpost.user_id=users.user_id
      
      where jobpost.contractor_id=$1
      and jobpost.status=$2;`,
      [contractor_id, "Pending"],
      (error, results) => {
        //returns all
        if (error) {
          //checks for errors and return them
          res.status(200).json(error); //Throw the error in the terminal
        }
        res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.Rating = (req, res) => {
  const contractor_id = req.params.contractor_id;
  client.query(
    `SELECT * FROM review where contractor_id= $1;`,
    [contractor_id],
    (error, results) => {
      //returns all
      if (error) {
        //checks for errors and return them
        res.status(200).json(error); //Throw the error in the terminal
      }

      res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
    }
  );
};

module.exports.activeJob = (req, res) => {
  const contractor_id = req.params.contractor_id;


  try {
    client.query(
      `select users.user_id,users.firstname,users.phonenumber,users.email,jobpost.contractor_id, jobpost.job_id, jobpost.description,jobpost.jobimg,jobpost.job_date
      from jobpost
      Inner join users 
      on jobpost.user_id=users.user_id
    
      where jobpost.contractor_id=$1
      and jobpost.status=$2;`,
      [contractor_id, "active"],
      (error, results) => {
        //returns all
        if (error) {
          //checks for errors and return them
          res.status(200).json(error); //Throw the error in the terminal
        }
 
        res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.updateStatus = (req, res) => {
  const job_id = req.params.job_id;
  const status = req.body


  try {
    client.query(
      `UPDATE jobpost SET status = $2 WHERE job_id = $1;`,
      [job_id, status.status],
      (error, results) => {
        //returns all
        if (error) {
          
          res.status(200).json(error); //Throw the error in the terminal
        }
        
        res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
      }
    );
  } catch (err) {}
};
