const client = require("../../../backend/src/configs/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {

  const { firstname, lastname, email, phonenumber, password, usertype } = req.body;




  try {


    if (!(usertype == "Contractor" || usertype == "Client")) {
      return res.status(400).json({
        error:
          "wrong type",
      });
    }
    const data = await client.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    ); //Check if user exist

    const regData = data.rows;
    if (regData.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        //encryting the password so that it can't be hacked.
        const users = {
          firstname,
          lastname,
          email,
          phonenumber,
          password: hash,
          usertype,
        };
       // console.log(users);
        var flag = 1;
        //Inserting data to Database

        client.query(
          `INSERT INTO users (firstname, lastname, email, phonenumber, password, usertype) VALUES ($1,$2,$3,$4,$5,$6)`,
          [
            users.firstname,
            users.lastname,
            users.email,
            users.phonenumber,
            users.password,
            users.usertype,
          ],
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
                .send({ message: "User added to database" });
            }
          }
        );
        // unique token
        if (flag) {
          const token = jwt.sign(
            {
              //Signing a jwt token
              email: users.email,
            },
            process.env.SECRET_KEY
          );
          users.token = token;
        }
      });
    }
  } catch {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }

};