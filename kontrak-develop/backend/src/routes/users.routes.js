const express = require('express');

const router = express.Router();

const {register} = require("../Controllers/registration.controller");

router.post('/register/' , register); //POST request to register the user

module.exports = router;

