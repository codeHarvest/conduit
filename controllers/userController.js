const User = require('../models/User');


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