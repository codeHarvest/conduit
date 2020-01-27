const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('../auth');

router.post('/users', function(req,res,next){
    var user = new User();

    var { username,email,password } = req.body.user;

    user.username = username;
    user.email = email;
    user.setPassword(password);

    user.save().then(function(){
        return res.json({ user: user.toAuthJSON() });
    }).catch(next);
})

module.exports = router;

