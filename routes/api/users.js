const router = require('express').Router();
const userController = require('../../controllers/userController');
const auth = require('../auth');


router.post('/users', userController.registerUser);

router.post('/users/login', userController.loginUser);

router.get('/user',auth.required , userController.getUser);

router.put('/user', auth.required , userController.updateUser);

module.exports = router;

