const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');

exports.registerUser = (req,res,next) => {
    var user = new User();
    var { username,email,password } = req.body.user;
    
    user.username = username;
    user.email = email;
    user.password = password;

    user.save().then(() => {
        return res.json({
            user: user.toAuthJSON()
        });
    }).catch(next);
}

exports.loginUser = (req,res,next) => {
    if(!req.body.user.email){
        return res.status(422).json({ errors : { email : "can't be blank" } });
    }
    if(!req.body.user.password){
        return res.status(422).json({ errors : { password : "can't be blank" } });
    }

    passport.authenticate('local', { session : false } ,(err,user,info) => {
        if(err){
            return next(err);
        }
        
        if(user){
            user.token = user.genrateJWT();
            return res.json({ user : user.toAuthJSON() });
        }else{
            return res.status(422).json(info);
        }
    })(req,res,next);
}

exports.getUser = (req,res,next) => {
    User.findById(req.payload.id).then((user) => {
        if(!user){
            return res.sendStatus(401);
        }
        return res.json({ user : user.toAuthJSON() });
    }).catch(next);
};

exports.updateUser = (req,res,next) => {

    const { username, password, email, image, bio } = req.body.user;

    User.findById(req.payload.id).then((user) => {
        if(!user){
            return res.sendStatus(401);
        }
        
        if(typeof username !== 'undefined'){
            user.username = username;
        }

        if(typeof email !== 'undefined'){
            user.email = email;
        }
        
        if(typeof password !== 'undefined'){
            user.setPassword(password);
        }

        if(typeof image !== 'undefined'){
            user.image = image;
        }

        if(typeof bio !== 'undefined'){
            user.bio = bio;
        }

        return user.save().then(() => {
            return res.json({ user: user.toAuthJSON() });
        })
    }).catch(next);

};