
const mongoose = require('mongoose');
// user schema model with timestamps
var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    bio: String,
    image: String,
    hash: String,
    salt: String
},
{
    timestamps : true
});
//  registering schema 
const User = mongoose.model('user', UserSchema);
// exporting schema
module.exports = User;