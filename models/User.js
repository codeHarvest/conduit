
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

// user schema model with timestamps
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
        unique: true
    },
    bio: String,
    image: String,
    hash: String,
    salt: String
},
{
    timestamps : true
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.genrateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/ 1000)
    },secret);
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.genrateJWT(),
        bio: this.bio,
        image: this.image
    }
}
//  registering schema 
mongoose.model('user', UserSchema);
// exporting schema
// module.exports = User;