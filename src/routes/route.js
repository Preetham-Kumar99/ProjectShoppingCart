const express = require('express');

const router = express.Router();

const fs = require("fs");

const {userController} = require('../controllers')


// user routes
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;