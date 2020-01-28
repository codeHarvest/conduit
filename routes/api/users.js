const mongoose = require('mongoose');
const router = require('express').Router();
const userController = require('../../controllers/userController');

router.post('/users', userController.registerUser);

router.post('/users/login', userController.loginUser);

module.exports = router;

