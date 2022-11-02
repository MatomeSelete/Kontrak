const pool = require("../../../backend/src/configs/database");
const cloudinary = require("../../../backend/src/cloudinary/clouudinary");

//================get contractors ====================
module.exports.getContractors = (req, res) => {
  const { location, category_name, sub_catname } = req.body;


  try {


    

    console.log(location, category_name, sub_catname);
    pool.query(
      `select users.firstname,users.user_id, users.phonenumber,users.email,contractor.contractor_id,contractor.location, contractor.images, contractor.calloutfee, category.category_name, sub_category.sub_catname
      from contractor
      INNER JOIN users on users.user_id=contractor.user_id
      INNER JOIN category on  category.contractor_id=contractor.contractor_id
   
      INNER JOIN  sub_category on sub_category.category_id=category.category_id
      where  location = $1  AND category_name = $2 AND sub_catname =$3;`
      ,
      [location, category_name, sub_catname],
      (error, results) => {
            //checks for errors and return them
        if (error) {
          console.log(error)
          res.status(500).json
  ({
    message: error,
  });
        }
        res.status(200).json(results.rows); //Show me what you got from database if there is no error
      }


    )


  }
  catch (err) {
    res.status(500).json
      ({
        message: "Database error while getting contractors",
      });
  };




}

//=====================get job requests==============
module.exports.getRequests=(req,res)=>{
const req_id = req.body

console.log(req_id);
  pool.query(`select users.firstname,users.phonenumber,users.email, requests.job_id, jobpost.description,jobpost.jobimg,jobpost.job_date
  from requests
  Inner join users 
  on requests.user_id=users.user_id
  Inner join jobpost
  on requests.job_id=jobpost.job_id
  where req_id=$1 ;`,[req_id.req_id],(error, results) => {
   
    if (error) {
      //checks for errors and return them
      res.status(500).json(error);
    }
    res.status(200).json(results.rows); //Return a status 200 and the rows if there is no error
  })

}

//====================== Post job requests=====================
module.exports.postRequest = (req, res) => {
  const { contractor_id, user_id} = req.body;
  console.log(  contractor_id, user_id);
  pool.query(`update jobpost set contractor_id=$1 where user_id=$2;`, [contractor_id, user_id], (err) => {
    if (err) {
       //checks for errors and return them
      console.error(err);
      return res.status(500).json({
        error: err,
      });
    } else {
 //successfully sent result
      res.status(200)
        .send({ message: "request added to database" });
    }
  }

  )


}


//================get contractors gallery==============
module.exports.getGallery=(req,res)=>{
const contractor_id=req.body
console.log('707',contractor_id.contractor_id);
  try{
  pool.query(`select * from gallery where contractor_id=$1 `,[contractor_id.contractor_id], (error, results) => {
  //returns all 
  if (error) {
    //checks for errors and return them
    res.status(500).json({
      message: error,
    });
  }
  res.status(200).json(results.rows);  //show me what you got from database if there is no error
  })
}catch(err){
  console.log(res)
}}
//=================get contractor info===================
module.exports.getCon = (req, res) => {
  const user_id = req.body;

    pool.query(
       `select users.firstname,users.user_id, users.phonenumber,users.email,contractor.contractor_id,contractor.location, contractor.images, contractor.calloutfee, category.category_name, sub_category.sub_catname
      from contractor
      INNER JOIN users on users.user_id=contractor.user_id
      INNER JOIN category on  category.contractor_id=contractor.contractor_id
   
      INNER JOIN  sub_category on sub_category.category_id=category.category_id
      where  users.user_id=$1;`
      ,
      [user_id.user_id],
      (error, results) => {
           //checks for errors and return them
        if (error) {
          console.log(error)
          res.status(500).json
  ({
    message: error,
  });
        }
        res.status(200).json(results.rows); //show me what you got from database if there is no error
      }


    )


  }
