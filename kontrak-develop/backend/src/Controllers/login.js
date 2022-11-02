const pool = require("../../../backend/src/configs/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Login Function

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
 

    const data = await pool.query(`SELECT * FROM users WHERE email= $1;`, [email]); //Veryfying if the user exists in the database
  


    const user = data.rows;


    if (user.length == 0) {
      return res.status(400).json({

        error: "User is not registerd, Please Sign Up",
      });

    } 
    
    else {
    
    
      bcrypt.compare(password,user[0].password , (err, results) => { // Comparing the hashed password
        if (err) {
         return  res.status(500).json({
            error: "Server Error"
          });
        } else if (results === true) { //Checking if the credentials match

          const token = jwt.sign(
            {
              user: user[0]
            },

            process.env.SECRET_KEY,

            
            {expiresIn: '24h'}
          );
      
          data.rows.token = token
          
          res.status(200).json({
            message: "User signed in!",
            token: token
            
          });

        }
        else {


          //Declaring the errors
          if (results != true) {
           // console.log(user)
            res.status(400).json({
              error: "Enter the correct password" 

            });
          }
        }
      })
    }
  } 
  catch (err) {
   
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  };
};







