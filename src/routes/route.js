const express = require('express');

const router = express.Router();

const fs = require("fs");

const {userController} = require('../controllers')


// user routes
router.post('/register', userController.registerUser);

module.exports = router;