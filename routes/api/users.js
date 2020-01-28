const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const auth = require('../auth');
const userController = require('../../controllers/userController');

router.post('/users', userController.registerUser);

module.exports = router;

