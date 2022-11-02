const express = require('express');

const router = express.Router();

const forgotPassword = require("../Controllers/forgotPassword.controller");

router.post('/forgot/' , forgotPassword.mailsend); //POST request to register the user
router.post('/change', forgotPassword.changePassword)
module.exports = router;
