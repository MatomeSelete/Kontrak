const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const client = require("../configs/database");

const nodemailer = require("nodemailer");



module.exports.mailsend =  (req, res)=> {
    // get email from request body 
    const email = req.body;

    //check if user exists
    console.log('1st');
    console.log(email.email);
  client.query("SELECT * FROM users WHERE email= $1",[email.email],(err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result.rows);
      if (result.rows !=0) {
        var key = between()
        sendMails(email.email, key);
      } else {
        //if not found, return an error
        type = "error";
        msg = "The Email is not registered with us"; 
        res.status(400).json({
        error: type,
        msg,
      })
      }
     ;
    }
  )



  function between() {  
    min = 1000;
    max = 5000;
    return Math.floor(
      Math.random() * (max - min) + min
    )
  }

  // this is the function to send an email
  function sendMails(email, data) {
    console.log("this 2nbd ", email);
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "survello101@gmail.com",
        pass: "uebhqfzzpbjxpcbl",
      },
    });


    var mailOptions = {
      from: "SurvEllo",
      to: `${email}`,
      subject: "Survey",
      text: `passeword is =  ${data}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log({
          error: "Could not send" + error,
        });
      } else {
        console.log("Email sent");
        console.log(info.response);
    
         res.status(200).json({
          message:"Email succesfully sent",
          code: data
        })
      };

      }
     
    );
  }
}
module.exports.changePassword =  (req, res)=> {
  const {email, password} =req.body
  console.log('yihd ', email, password);
  try{
    console.log('2sr');

          // client.query(
          // "UPDATE users SET password= $2 WHERE email=$1;",
          // [email, password],
        //   (err, result) => {
        //     if (err) {
        //       console.log("xxxxxxx");
        //     }
        //   }
        // );

        // res.status(200).send({
        //   message:"changed passs"
        // })

        //encryting the password so that it can't be hacked.
        bcrypt.hash(password, 10, (err, hash) => {
        const users = {
          email,
          password: hash,
        };
        console.log("ddd " , users);
        var flag = 1;
        client.query(
          "UPDATE users SET password= $2 WHERE email=$1;",
          [email, users.password],
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
                .send({ message: "User updated" });
            }
          }
        );
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
      })
      
  }catch(err){
    res.status(400).send(
    "errrror"
  )
  }
}



