const express = require('express');

const router = express.Router();

const fs = require("fs");

const { userAuth } = require('../middleware')

const { userController } = require('../controllers')


// user routes
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/user/:userId/profile', userAuth, userController.getUser)

module.exports = router;