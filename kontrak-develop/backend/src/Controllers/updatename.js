const pool = require("../../config/database");
const express = require("express");
const app = express();
const bodyparser = require('body-parser');

exports.updatename = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        res.status(500).json
        ({
          message: error,
        });
      }
      res.status(200).send(`User updated with ID: ${id}`);
    }
  );
};
