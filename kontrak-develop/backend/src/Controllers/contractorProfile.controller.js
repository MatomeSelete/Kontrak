const pool = require("../../../backend/src/configs/database");
const cloudinary = require("../../../backend/src/cloudinary/clouudinary");
const bcrypt = require("bcrypt");

// Upload profile image as well
//set up initial values contractor need
//comment
module.exports.addProfile = async (req, res) => {
  try {
    const { location, calloutfee, user_id } = req.body;
    console.log(location, calloutfee, user_id);
  
//database query
    pool.query(
      `INSERT INTO contractor (job_count, user_id, location, images, calloutfee) VALUES ($1, $2, $3,$4,$5)`,
      [0, user_id, location, "defaau", calloutfee],
      (err, results) => {
        if (err) {
       
          console.error(err);
          return res.status(500).json({
            error: "Database error",  //if there is an error display database error
          });
        } else {
       
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Database error when uploading job images",
      error: err,
    });
  }

//add past job images to gallery
module.exports.addImages = async (req, res) => {
  try {
    const { contractor_id } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "/jobs/",
    });
    console.log(result);
    pool.query(
      `INSERT INTO gallery (contractor_id, image) VALUES ($1, $2)`,
      [contractor_id, result.secure_url],
      (err) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          res.status(200).send({ message: "image added to database" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Database error when uploading job images",
    });
  }
};

//add category
module.exports.addCategory = async (req, res) => {
  try {
    const { contractor_id, category_name } = req.body;
    console.log("cat 101 ", contractor_id, category_name);
    pool.query(
      `INSERT INTO category (category_name, contractor_id) VALUES ($1, $2)`,
      [category_name, contractor_id],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          console.log(results.rows);
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Database error when uploading job images",
    });
  }
};

//add subcategory
module.exports.addSubCat = async (req, res) => {
  try {
    const { category_id, sub_catname } = req.body;
    console.log(" sub ", category_id, sub_catname);

    pool.query(
      `INSERT INTO sub_category (category_id, sub_catname) VALUES ($1, $2)`,
      [category_id, sub_catname],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          console.log(results.rows);
          res.status(200).send(results.rows);
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Database error ",
    });
  }
};
//update call out fee via contractor id
module.exports.updateCalloutFee = (req, res) => {
  const contractor_id = req.params.contractor_id;
  const { calloutfee } = req.body;
  console.log(calloutfee);

  pool.query(
    `UPDATE contractor SET calloutfee= $1  WHERE contractor_id= $2 ;`,
    [calloutfee, contractor_id],
    (err) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        flag = 1;
        res.status(200).send({ message: "user's calloutfee updated" });
      }
    }
  );
};
//update category
module.exports.updateCategory = (req, res) => {
  const contractor_id = req.params.contractor_id;
  const { category_name } = req.body;
  console.log(category_name);

  pool.query(
    `UPDATE category SET category_name= $1  WHERE contractor_id= $2;`,
    [category_name, contractor_id],
    (err) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        flag = 1;
        res.status(200).send({ message: "user's contacts updated" });
      }
    }
  );
};
//update subcategory by id
module.exports.updateSubCategory = (req, res) => {
  const sub_id = req.params.sub_id;
  const { sub_catname } = req.body;
  console.log(sub_catname);

  pool.query(
    `UPDATE sub_category SET sub_catname= $1  WHERE sub_id= $2 ;`,
    [sub_catname, sub_id],
    (err) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        flag = 1;
        res.status(200).send({ message: "user's subcategory updated" });
      }
    }
  );
};
//update email and number
module.exports.updateContact = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { email, phonenumber } = req.body;
  console.log(email, phonenumber);

  pool.query(
    `UPDATE users SET email= $1, phonenumber= $2 WHERE user_id= $3;`,
    [email, phonenumber, user_id],
    (err) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        flag = 1;
        res.status(200).send({
          message: "user's contacts updated",
        });
      }
    }
  );
};

module.exports.updateName = (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const { firstname } = req.body;
  console.log("cleint name ", firstname, user_id);

  pool.query(
    `UPDATE users SET firstname= $1 WHERE user_id= $2;`,
    [firstname, user_id],
    (err, results) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        console.log("it wode");
        res.status(200).send({
          message: "user's contacts updated",
        });
      }
    }
  );
};
//update Password via user id
module.exports.updatePass = (req, res) => {
  const user_id = req.params.user_id;
  const { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    const user = {
      password: hash,
    };

    pool.query(
      `UPDATE users SET password = $1 WHERE user_id= $2`,
      [user.password, user_id],
      (err) => {
        if (err) {
          flag = 0; //If password is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          res.status(200).send({ message: "Password updated" });
        }
      }
    );
  });
};
//update uploaded
module.exports.updatePicture = async (req, res) => {
  const contractor_id = parseInt(req.params.contractor_id);

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "/jobs/",
    });

    pool.query(
      `UPDATE contractor SET images = $1 WHERE contractor_id= $2`,
      [result.secure_url, contractor_id],
      (error, results) => {
        if (error) {
          return res
            .status(401)
            .send({ message: "query error, unable to update" });
        }
        return res
          .status(200)
          .send({ message: "User profile updated successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
};
//update Location

module.exports.updateArea = (req, res) => {
  const user_id = req.params.user_id;
  const { location } = req.body;
  const user = {
    location,
  };

  pool.query(
    `UPDATE contractor SET location = $1 WHERE user_id= $2`,
    [user.location, user_id],
    (err) => {
      if (err) {
        flag = 0; //If user is not inserted to database assign flag as 0/false.
        console.error(err);
        return res.status(500).json({
          error: "Database error",
        });
      } else {
        flag = 1;
        res.status(200).send({ message: "contactor's area updated" });
      }
    }
  );
};
//delete pictures
module.exports.deleteGallery = (req, res) => {
  try {
    const img_id = req.body;
    pool.query(
      `delete from gallery where img_id=$1`,
      [img_id.img_id],
      (error, results) => {
        if (error) {
          return res
            .status(401)
            .send({ message: "query error, unable to delete" });
        }
        return res.status(200).send({ message: "deleted successfully" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
};

//get profile
module.exports.getProfile = (req, res) => {
  req;

  const user_id = parseInt(req.params.user_id);
  pool.query(
    `       select users.email, users.firstname, users.phonenumber, contractor.contractor_id, contractor.job_count, contractor.location, contractor.images, users.user_id, users.password, category.category_name, sub_category.sub_catname
            from contractor
            INNER JOIN users on users.user_id=contractor.user_id
            INNER JOIN category on  category.contractor_id=contractor.contractor_id
            INNER JOIN sub_category on sub_category.category_id = category.category_id
            where users.user_id=$1`,
    [user_id],
    (error, results) => {
      //returns all
      if (error) {
        //checks for errors and return them
        console.log(error);
      }
      res.status(200).json(results.rows); //Return a status 200 if there is no error
    }
  );
};

module.exports.firstTime = (req, res) => {
  req;

  const user_id = req.params.user_id;
  console.log("one time ", user_id);
  pool.query(
    ` SELECT * FROM contractor WHERE user_id =$1`,
    [user_id],
    (error, results) => {
      if (error) {
        //checks for errors and return them
        console.log(error);
      }
      res.status(200).json(results.rows); //Return a status 200 if there is no error
    }
  );
};

module.exports.getcon = (req, res) => {
  req;

  const user_id = parseInt(req.params.user_id);

  console.log("con ", user_id);
  pool.query(
    `select * from contractor where user_id =$1`,
    [user_id],
    (error, results) => {
      //returns all
      if (error) {
        //checks for errors and return them
        console.log(error);
      }
      res.status(200).json(results.rows); //Return a status 200 if there is no error
    }
  );
};

module.exports.getca = (req, res) => {
  req;

  const contractor_id = parseInt(req.params.contractor_id);

  console.log("con ", contractor_id);
  pool.query(
    `select * from category where contractor_id =$1`,
    [contractor_id],
    (error, results) => {
      //returns all
      if (error) {
        //checks for errors and return them
        console.log(error);
      }
      res.status(200).json(results.rows); //Return a status 200 if there is no error
    }
  );
};
// ===============
module.exports.finishProfile = async (req, res) => {
  try {
    const { contractor_id, category_name, location, calloutfee, user_id,category_id, sub_catname  } = req.body;
    console.log("cat 101 ", contractor_id, category_name);
    let contractor = await pool.query(
      `INSERT INTO contractor (job_count, user_id, location, images, calloutfee) VALUES ($1, $2, $3,$4,$5)`,
      [0, user_id, location, "defaau", calloutfee],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          res.status(200).json(results.rows);
        }
      }
    );
    let category  = await pool.query(
      `INSERT INTO category (category_name, contractor_id) VALUES ($1, $2)`,
      [category_name, contractor.contractor_id],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          console.log(results.rows);
          res.status(200).json(results.rows);
        }
      }
    );
    pool.query(
      `INSERT INTO sub_category (category_id, sub_catname) VALUES ($1, $2)`,
      [category.category_id, sub_catname],
      (err, results) => {
        if (err) {
          flag = 0; //If user is not inserted to database assign flag as 0/false.
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          console.log(results.rows);
          res.status(200).send(results.rows);
        }
      }
    );

  } catch (err) {
    res.status(500).json({
      message: "Database error when uploading job images",
    });
  }
}
}
